import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.phototourl.com",
        pathname: "/free/**",
      },
      {
        protocol: "https",
        hostname: "cdn.phototourl.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
