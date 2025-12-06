import { AwsRum, type AwsRumConfig } from "aws-rum-web";
import { frontendEnvs } from "@poc-cloudwatch-rum/envs/frontend";

const envs = frontendEnvs();

export default defineNuxtPlugin(() => {
  if (process.client) {
    try {
      const rumConfig: AwsRumConfig = {
        sessionSampleRate: 1,
        identityPoolId: envs.NUXT_PUBLIC_AWS_RUM_APPLICATION_ID,
        endpoint: envs.NUXT_PUBLIC_AWS_RUM_ENDPOINT,
        telemetries: ["performance", "errors", "http"],
        allowCookies: true,
        enableXRay: true,
        signing: true, // If you have a public resource policy and wish to send unsigned requests please set this to false
      };

      new AwsRum(
        envs.NUXT_PUBLIC_AWS_RUM_APPLICATION_ID,
        envs.NUXT_PUBLIC_AWS_RUM_APPLICATION_VERSION,
        envs.NUXT_PUBLIC_AWS_RUM_REGION,
        rumConfig,
      );
    } catch (error) {
      // Ignore errors thrown during CloudWatch RUM web client initialization
    }
  }
});
