/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    UNSPLASH_ACCESS_KEY: process.env.UNSPLASH_ACCESS_KEY,
    UNSPLASH_SECRET_KEY: process.env.UNSPLASH_SECRET_KEY,
  },
  images: {
    domains: ["images.unsplash.com", "upload.wikimedia.org"],
  },
  webpack: (config) => {
    config.externals["isomorphic-fetch"] = "fetch";
    return config;
  },
};

module.exports = nextConfig;
