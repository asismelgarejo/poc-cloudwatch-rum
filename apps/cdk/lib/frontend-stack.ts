import * as rum from "aws-cdk-lib/aws-rum";
import * as amplify from "aws-cdk-lib/aws-amplify";
import * as cdk from "aws-cdk-lib";
import * as path from "path";
import { Construct } from "constructs";
import { Environments } from "../shared";
import { readFileSync } from "fs";

type FrontendStackProps = cdk.StackProps & {
  environment: Environments;
  repositoryUrl: string;
};
export class FrontendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: FrontendStackProps) {
    super(scope, id, props);

    //#region amplify App
    // Reference the GitHub access token from Secrets Manager
    const githubToken =  cdk.SecretValue.ssmSecure(
      `${props.environment}/github/token`
    );

    const amplifyApp = new amplify.CfnApp(this, "poc-cloudwatch-rum", {
      name: `${props.environment}-poc-cloudwatch-rum-frontend`,
      description: "Frontend for testing cloudwatch rum",
      accessToken: githubToken.unsafeUnwrap(),
      repository: props.repositoryUrl,
      platform: "WEB_COMPUTE",
      // Build settings
      buildSpec: FrontendStack.GetAmplifyBuildSpec("build-spec.yml"),
    });

    // Create the main branch
    const mainBranch = new amplify.CfnBranch(this, "main", {
      appId: amplifyApp.attrAppId,
      branchName: "main",
      enableAutoBuild: false,
      enablePullRequestPreview: false,
      stage: "PRODUCTION",
      framework: "Nuxt.js - SSR",
      environmentVariables: [
        {
          name: "NODE_ENV",
          value: "production",
        },
      ],
    });
    //#endregion

    //#region RUM App Monitor
    const branchDomain = `${mainBranch.attrBranchName}.${amplifyApp.attrDefaultDomain}`;

    const rumAppMonitor = `${props.environment}-poc-cloudwatch-rum-frontend`;
    const iamResourcePolicy = {
      Version: "2012-10-17",
      Statement: [
        {
          Effect: "Allow",
          Action: "rum:PutRumEvents",
          Resource: `arn:aws:rum::${cdk.Stack.of(this).region}:${
            cdk.Stack.of(this).account
          }:appmonitor/${rumAppMonitor}`,
          Principal: "*",
        },
      ],
    };

    const rumCfn = new rum.CfnAppMonitor(this, "app-monitoring", {
      name: rumAppMonitor,
      domain: branchDomain,
      resourcePolicy: {
        policyDocument: JSON.stringify(iamResourcePolicy),
      },
    });
    rumCfn.addDependency(amplifyApp);
    rumCfn.addDependency(mainBranch);
    //#endregion
  }

  private static GetAmplifyBuildSpec = (filename: string): string => {
    const filepath = path.join(__dirname, filename);
    const filecontent = readFileSync(filepath, "utf-8");
    return filecontent;
  };
}
