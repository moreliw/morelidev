import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MoreliDev — Engenharia de software e produtos digitais",
    short_name: "MoreliDev",
    description:
      "Sistemas sob medida, produtos digitais, SaaS, sites institucionais e integrações.",
    start_url: "/",
    display: "browser",
    background_color: "#f6f5f1",
    theme_color: "#f6f5f1",
    icons: [
      { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
