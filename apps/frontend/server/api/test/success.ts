export default defineEventHandler(() => {
  return {
    success: true,
    message: "Request successful!",
    timestamp: new Date().toISOString(),
    data: {
      status: "OK",
      version: "1.0.0",
    },
  };
});
