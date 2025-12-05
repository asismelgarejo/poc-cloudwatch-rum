import * as cdk from "aws-cdk-lib";
import { FrontendStack } from "../lib/frontend-stack";
import { envs } from "@/poc-cloudwatch-rum/envs";
const app = new cdk.App();
const env = envs();
new FrontendStack(app, "frontend", {
  environment: "TEST",
  env: {
    account: env.AWS_ACCOUNT,
    region: env.AWS_REGION,
  },
});
