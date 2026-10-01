import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Pin the project root (a stray lockfile in a parent folder otherwise confuses Turbopack).
  turbopack: { root: __dirname },
  images: {
    // Placeholder stock photos (src/data/images.ts). Can be removed once
    // all photos are served from /public.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/photo-**" },
      { protocol: "https", hostname: "images.pexels.com", pathname: "/photos/**" },
    ],
  },
};

export default nextConfig;
