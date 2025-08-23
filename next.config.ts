import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['res.cloudinary.com','essentialsaltspa.com', 'images.unsplash.com', 's.alicdn.com','edinamag.com'], // Add actual domains used
  
  },
  pageExtensions:["mdx","md","tsx","ts","jsx","js","page.tsx","api.ts"],
};

export default nextConfig;
