/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.externals = config.externals || [];
    config.externals.push('undici'); // Exclude from bundle

    return config;
  },
};

module.exports = nextConfig;

