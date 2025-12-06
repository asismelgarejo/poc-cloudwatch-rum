import { AwsRum, type AwsRumConfig } from "aws-rum-web";

export default defineNuxtPlugin(() => {
  if (process.client) {
    try {
      const config = useRuntimeConfig();
      const rumConfig: AwsRumConfig = {
        sessionSampleRate: 1,
        endpoint: config.public.awsRum.endpoint,
        telemetries: ["performance", "errors", "http"],
        allowCookies: true,
        enableXRay: true,
        signing: true, // If you have a public resource policy and wish to send unsigned requests please set this to false
      };

      new AwsRum(
        config.public.awsRum.applicationId,
        config.public.awsRum.applicationVersion,
        config.public.awsRum.region,
        rumConfig,
      );
    } catch (error) {
      // Ignore errors thrown during CloudWatch RUM web client initialization
    }
  }
});
