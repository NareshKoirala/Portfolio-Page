import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images:{
    unoptimized: true // Set to true if you want to use unoptimized images
  },
  
  // Environment variables configuration (NODE_ENV is not allowed here)
  env: {
    MONGO_URI: process.env.MONGO_URI,
    MONGO_DB: process.env.MONGO_DB,
  },
  
  // External packages optimization for MongoDB
  serverExternalPackages: ['mongodb'],
};

export default nextConfig;
