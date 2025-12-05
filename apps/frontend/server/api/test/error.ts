export default defineEventHandler(() => {
  throw createError({
    statusCode: 404,
    statusMessage: "Resource Not Found",
    message: "This is a test error endpoint",
  });
});
