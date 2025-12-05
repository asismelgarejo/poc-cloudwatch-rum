import { AwsRum, AwsRumConfig } from "aws-rum-web";

export default defineNuxtPlugin(() => {
  if (process.client) {
    try {
      const config: AwsRumConfig = {
        sessionSampleRate: 1,
        identityPoolId: "us-east-1:0c5f2cb2-b2fc-400c-ad0d-0cc94e7c5c31",
        endpoint: "https://dataplane.rum.us-east-1.amazonaws.com",
        telemetries: ["performance", "errors", "http"],
        allowCookies: true,
        enableXRay: true,
        signing: true, // If you have a public resource policy and wish to send unsigned requests please set this to false
      };

      const APPLICATION_ID: string = "d010f5df-dcc4-4e73-9fae-4a17a8e8fb26";
      const APPLICATION_VERSION: string = "1.0.0";
      const APPLICATION_REGION: string = "us-east-1";

      new AwsRum(
        APPLICATION_ID,
        APPLICATION_VERSION,
        APPLICATION_REGION,
        config,
      );
    } catch (error) {
      // Ignore errors thrown during CloudWatch RUM web client initialization
    }
  }
});
