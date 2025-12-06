import { frontendEnvs } from "@/envs";

export default defineNuxtPlugin(() => {
  // Validate environment variables on app initialization
  // This will throw an error if any required env vars are missing or invalid
  try {
    frontendEnvs();
  } catch (error) {
    console.error("Environment validation failed:", error);
    throw error;
  }
});
