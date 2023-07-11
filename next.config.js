module.exports = {
  reactStrictMode: false,
  webpack5: true,
  webpack5 : (config) => {
  	config.resolve.fallback = {fs: false};
  },
};
