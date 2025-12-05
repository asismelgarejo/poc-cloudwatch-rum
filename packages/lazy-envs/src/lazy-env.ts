import {
  parseWithDictionary,
  StandardSchemaDictionary,
  StandardSchemaV1,
} from "./standard";

/**
 * Configuration options for {@link createLazyEnv}
 */
interface CreateEnvOptions<S extends StandardSchemaDictionary> {
  /**
   * The schema defining environment variables, their types, and validation rules.
   * Each key is an environment variable name, and the value is its schema.
   */
  schema: S;

  /**
   * Optional override for the source of runtime environment variables.
   * Defaults to `process.env`. This is useful for testing or for environments
   * where `process.env` is not the source.
   */
  runtimeEnv?: Record<string, string | undefined>;
}
type NormalizeInferInput<T extends StandardSchemaDictionary> = {
  [K in keyof T as undefined extends StandardSchemaV1.InferInput<T[K]>
    ? never
    : K]: StandardSchemaV1.InferInput<T[K]>;
} & {
  [K in keyof T as undefined extends StandardSchemaV1.InferInput<T[K]>
    ? K
    : never]?: StandardSchemaV1.InferInput<T[K]>;
};

/**
 * Interface for the env object, it needs to be lazy so we can use it
 */
export type LazyEnv<S extends StandardSchemaDictionary> = {
  /**
   * Do evaluate env, validation will be performed only use it from application code
   */
  (): StandardSchemaDictionary.InferOutput<S>;
  /**
   * Helper function to declare the environment variables, useful when declaring those in
   * in a `Function` cdk construct declaration. Additionally, it allows any other arbitrary
   * string key-value pairs to be included for deployment, however this variables will not
   * exist in the parsed object.
   */
  getDeclaration: <
    TDeclaration extends NormalizeInferInput<S> & Record<string, string>,
  >(
    values: TDeclaration,
  ) => TDeclaration;
};

/**
 * Helper function to format validation issues into a readable error message.
 */
function formatValidationIssues(
  issues: ReadonlyArray<StandardSchemaV1.Issue>,
): string {
  const errorMessages = issues.map((issue) => {
    const path = issue.path
      ? issue.path
          .map((segment) =>
            typeof segment === "object" && "key" in segment
              ? segment.key
              : segment,
          )
          .join(".")
      : "unknown";
    return `  - ${path}: ${issue.message}`;
  });

  return `Invalid environment variables:\n${errorMessages.join("\n")}`;
}

/**
 * Creates a validated and typed environment object based on a provided schema.
 *
 * @param config Configuration options, including the `schema` for validation
 * and an optional `runtimeEnv` source.
 * @returns A lazy environment object that validates on first call
 * @throws Error if validation fails with detailed validation issues
 *
 * @example
 * ```typescript
 * import { createLazyEnv } from '@poc-cloudwatch-rum/lazy-envs';
 * import z from 'zod';
 *
 * const env = createLazyEnv({
 *   schema: {
 *     DATABASE_URL: z.string().url(),
 *     PORT: z.string().regex(/^\d+$/)
 *   }
 * });
 *
 * // Validation happens on first call
 * const config = env();
 * console.log(config.DATABASE_URL);
 * ```
 */
export function createLazyEnv<S extends StandardSchemaDictionary>(
  config: CreateEnvOptions<S>,
): LazyEnv<S> {
  const { schema, runtimeEnv = process.env } = config;

  const doEval = (): StandardSchemaDictionary.InferOutput<S> => {
    const parsed = parseWithDictionary(schema, runtimeEnv);
    if (parsed.issues) {
      throw new Error(formatValidationIssues(parsed.issues));
    }

    return (parsed as StandardSchemaV1.SuccessResult<S>).value;
  };

  const getDeclaration: LazyEnv<S>["getDeclaration"] = (value) => value;

  return Object.assign(doEval, { getDeclaration });
}
