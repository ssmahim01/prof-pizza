import type { NextConfig } from "next";
import nextI18NextConfig from "./next-i18next.config";

const nextConfig: NextConfig = {
  ...nextI18NextConfig,
  images: {
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
