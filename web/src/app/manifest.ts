import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "moreli.dev — William Moreli",
    short_name: "moreli.dev",
    description:
      "Engenharia de software: sistemas web, plataformas SaaS e integrações.",
    start_url: "/",
    display: "browser",
    background_color: "#05080f",
    theme_color: "#05080f",
    icons: [{ src: "/icon-dev.png", sizes: "any", type: "image/png" }],
  };
}
