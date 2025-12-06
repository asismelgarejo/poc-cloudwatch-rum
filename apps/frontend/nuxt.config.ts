// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  nitro: {
    preset: "aws-amplify",
  },
  alias: {
    "@/envs": "../../packages/envs/src/index.ts",
    "@/lazy-envs": "../../packages/lazy-envs/src/index.ts",
  },
  runtimeConfig: {
    public: {
      awsRum: {
        applicationId: process.env.NUXT_PUBLIC_AWS_RUM_APPLICATION_ID || "",
        applicationVersion:
          process.env.NUXT_PUBLIC_AWS_RUM_APPLICATION_VERSION || "1.0.0",
        region: process.env.NUXT_PUBLIC_AWS_RUM_REGION || "us-east-1",
        identityPoolId: process.env.NUXT_PUBLIC_AWS_RUM_IDENTITY_POOL_ID || "",
        endpoint:
          process.env.NUXT_PUBLIC_AWS_RUM_ENDPOINT ||
          "https://dataplane.rum.us-east-1.amazonaws.com",
      },
    },
  },
});
