import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "egruppa-storage.s3.amazonaws.com",
      "picsum.photos",
      "egruppa-storage.s3.eu-west-3.amazonaws.com",
    ], // Add the S3 bucket hostname here
  },
};

export default nextConfig;
