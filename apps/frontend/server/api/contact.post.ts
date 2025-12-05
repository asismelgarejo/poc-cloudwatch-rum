export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // Simulate processing time
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Validate input
  if (!body.name || !body.email || !body.message) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Name, email, and message are required",
    });
  }

  // Log the contact form submission
  console.log("Contact form submitted:", {
    name: body.name,
    email: body.email,
    message: body.message,
    timestamp: new Date().toISOString(),
  });

  return {
    success: true,
    message: "Your message has been sent successfully!",
    submittedAt: new Date().toISOString(),
  };
});
