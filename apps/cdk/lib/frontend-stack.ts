import * as rum from "aws-cdk-lib/aws-rum";
import * as amplify from "aws-cdk-lib/aws-amplify";
import * as cdk from "aws-cdk-lib";
import * as path from "path";
import { Construct } from "constructs";
import { Environments } from "../shared";
import { readFileSync } from "fs";
import { frontendEnvs } from "@poc-cloudwatch-rum/envs/frontend";

type FrontendStackProps = cdk.StackProps & {
  environment: Environments;
  repositoryUrl: string;
};
export class FrontendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: FrontendStackProps) {
    super(scope, id, props);

    //#region amplify App
    const amplifyApp = new amplify.CfnApp(this, "poc-cloudwatch-rum", {
      name: `${props.environment}-poc-cloudwatch-rum-frontend`,
      description: "Frontend for testing cloudwatch rum",
      accessToken: "{{resolve:secretsmanager:/TEST/github/token:SecretString}}",
      repository: props.repositoryUrl,
      platform: "WEB_COMPUTE",
      // Build settings
      buildSpec: FrontendStack.GetAmplifyBuildSpec("build-spec.yml"),
    });

    //#region RUM App Monitor
    const rumAppMonitor = `${props.environment}-poc-cloudwatch-rum-frontend`;
    const iamResourcePolicy = {
      Version: "2012-10-17",
      Statement: [
        {
          Effect: "Allow",
          Action: "rum:PutRumEvents",
          Resource: `arn:aws:rum:${cdk.Stack.of(this).region}:${
            cdk.Stack.of(this).account
          }:appmonitor/${rumAppMonitor}`,
          Principal: "*",
        },
      ],
    };

    const rumCfn = new rum.CfnAppMonitor(this, "app-monitoring", {
      name: rumAppMonitor,
      domain: amplifyApp.attrDefaultDomain, // Temporarily use app domain, will be updated after branch creation
      resourcePolicy: {
        policyDocument: JSON.stringify(iamResourcePolicy),
      },
    });
    rumCfn.addDependency(amplifyApp);
    //#endregion

    // Create the main branch with RUM environment variables
    const environmentVariables = Object.entries(
      frontendEnvs.getDeclaration({
        NUXT_NODE_ENV: "PROD",
        NUXT_PUBLIC_AWS_RUM_APPLICATION_ID: rumCfn.attrId,
        NUXT_PUBLIC_AWS_RUM_APPLICATION_VERSION: "1.0.0",
        NUXT_PUBLIC_AWS_RUM_REGION: cdk.Stack.of(this).region,
        NUXT_PUBLIC_AWS_RUM_ENDPOINT: `https://dataplane.rum.${
          cdk.Stack.of(this).region
        }.amazonaws.com`,
      }),
    ).map(([key, value]) => ({ name: key, value: value.toString() }));

    const mainBranch = new amplify.CfnBranch(this, "main", {
      appId: amplifyApp.attrAppId,
      branchName: "main",
      enableAutoBuild: true,
      enablePullRequestPreview: false,
      stage: "PRODUCTION",
      framework: "Nuxt.js - SSR",
      environmentVariables,
    });
    mainBranch.addDependency(rumCfn);
    //#endregion
  }

  private static GetAmplifyBuildSpec = (filename: string): string => {
    const filepath = path.join(__dirname, filename);
    const filecontent = readFileSync(filepath, "utf-8");
    return filecontent;
  };
}
