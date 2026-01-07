export const generateRatings = (packages) =>
  packages.map((pkg) => ({
    ...pkg,
    rating: (Math.random() * (5 - 3.5) + 3.5).toFixed(1),
  }));
