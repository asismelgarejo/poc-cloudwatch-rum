export default defineEventHandler((event) => {
  const id = getRouterParam(event, "id");

  const products: Record<string, any> = {
    "1": {
      id: 1,
      name: "Game of the Year 2024",
      price: 59.99,
      description:
        "The ultimate gaming experience with stunning graphics and immersive gameplay",
      rating: 4.9,
      inStock: true,
    },
    "2": {
      id: 2,
      name: "Epic Adventure DLC",
      price: 29.99,
      description: "Expand your journey with 20+ hours of new content",
      rating: 4.7,
      inStock: true,
    },
    "3": {
      id: 3,
      name: "Multiplayer Season Pass",
      price: 39.99,
      description:
        "Get access to all multiplayer content for the entire season",
      rating: 4.8,
      inStock: true,
    },
    "4": {
      id: 4,
      name: "Collector's Edition",
      price: 99.99,
      description: "Premium edition with exclusive items and early access",
      rating: 5.0,
      inStock: false,
    },
  };

  const product = products[id || "1"];

  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: "Product Not Found",
    });
  }

  return product;
});
