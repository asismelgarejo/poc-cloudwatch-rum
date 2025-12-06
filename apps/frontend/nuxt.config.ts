// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  nitro: {
    preset: "aws-amplify",
  },
  vite: {
    optimizeDeps: {
      include: ["@poc-cloudwatch-rum/envs", "@poc-cloudwatch-rum/lazy-envs"],
    },
    build: {
      commonjsOptions: {
        include: [
          /@poc-cloudwatch-rum\/envs/,
          /@poc-cloudwatch-rum\/lazy-envs/,
          /node_modules/,
        ],
      },
    },
  },
});
