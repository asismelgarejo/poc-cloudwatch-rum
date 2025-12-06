import { createLazyEnv, type LazyEnv } from "@/lazy-envs";
import z from "zod";

/**
 * Environment variable schema for CDK deployment configuration.
 * Defines required AWS account and region settings.
 */
const cdkEnvSchema = {
  AWS_ACCOUNT: z
    .string()
    .min(12)
    .max(12)
    .describe("AWS Account ID (12 digits)"),
  AWS_REGION: z.string().min(1).describe("AWS Region (e.g., us-east-1)"),
  REPOSITORY_URL: z
    .string()
    .min(1)
    .describe("GitHub repository URL for the current project"),
} as const;

/**
 * Validated and typed CDK environment variables.
 * Call as a function to get the validated environment object.
 *
 * @example
 * ```typescript
 * const config = envs();
 * console.log(config.AWS_ACCOUNT, config.AWS_REGION);
 * ```
 */
export const envs: LazyEnv<typeof cdkEnvSchema> = createLazyEnv({
  schema: cdkEnvSchema,
});
