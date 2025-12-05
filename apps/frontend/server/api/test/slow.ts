export default defineEventHandler(async () => {
  // Simulate a slow API call
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return {
    success: true,
    message: "Slow request completed after 3 seconds",
    timestamp: new Date().toISOString(),
    processingTime: "3000ms",
  };
});
