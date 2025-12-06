import { createLazyEnv, type LazyEnv } from "@poc-cloudwatch-rum/lazy-envs";
import z from "zod";

/**
 * Environment variable schema for Amplify frontend application.
 * Defines AWS CloudWatch RUM configuration settings.
 */
const frontendEnvSchema = {
  // NUXT_NODE_ENV: z.enum(["development", "production"]),
  NUXT_PUBLIC_AWS_RUM_APPLICATION_ID: z
    .string()
    .min(1)
    .describe("AWS CloudWatch RUM Application ID"),
  NUXT_PUBLIC_AWS_RUM_APPLICATION_VERSION: z
    .string()
    .min(1)
    .default("1.0.0")
    .describe("Application version for RUM tracking"),
  NUXT_PUBLIC_AWS_RUM_REGION: z
    .string()
    .min(1)
    .default("us-east-1")
    .describe("AWS Region for CloudWatch RUM"),
  NUXT_PUBLIC_AWS_RUM_ENDPOINT: z
    .string()
    .url()
    .default("https://dataplane.rum.us-east-1.amazonaws.com")
    .describe("CloudWatch RUM data plane endpoint"),
} as const;

/**
 * Validated and typed frontend environment variables.
 * Call as a function to get the validated environment object.
 *
 * @example
 * ```typescript
 * const config = frontendEnvs();
 * console.log(config.NUXT_PUBLIC_AWS_RUM_APPLICATION_ID);
 * ```
 */
export const frontendEnvs: LazyEnv<typeof frontendEnvSchema> = createLazyEnv({
  schema: frontendEnvSchema,
});