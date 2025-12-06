import { frontendEnvs } from "@poc-cloudwatch-rum/envs";
const envs = frontendEnvs();
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  nitro: {
    preset: "aws-amplify",
  },
  runtimeConfig: {
    public: {
      awsRum: {
        applicationId: envs.NUXT_PUBLIC_AWS_RUM_APPLICATION_ID,
        applicationVersion: envs.NUXT_PUBLIC_AWS_RUM_APPLICATION_VERSION,
        region: envs.NUXT_PUBLIC_AWS_RUM_REGION,
        endpoint: envs.NUXT_PUBLIC_AWS_RUM_ENDPOINT,
      },
    },
  },
});
