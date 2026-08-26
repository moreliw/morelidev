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
    icons: [{ src: "/icon-dev.png", sizes: "any", type: "image/png" }],
  };
}
