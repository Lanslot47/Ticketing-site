/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["image.tmdb.org"],
  },
  eslint:{
    ignoreDuringProduction:true
  }
};

module.exports = nextConfig;
