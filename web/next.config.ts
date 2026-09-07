import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // AVIF primeiro: os mockups de produto pesam ~40% menos que em WebP.
  images: { formats: ["image/avif", "image/webp"] },
  reactCompiler: true,
  serverExternalPackages: ["@prisma/client"],
};

export default nextConfig;
