import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images:{
    unoptimized: true // Set to true if you want to use unoptimized images
  },
};

export default nextConfig;
