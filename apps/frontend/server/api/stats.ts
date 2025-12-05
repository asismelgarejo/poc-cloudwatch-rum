export default defineEventHandler(() => {
  // Generate random stats for demo purposes
  return {
    users: Math.floor(Math.random() * 10000) + 1000,
    pageViews: Math.floor(Math.random() * 50000) + 5000,
    sessions: Math.floor(Math.random() * 500) + 50,
    timestamp: new Date().toISOString(),
  };
});
