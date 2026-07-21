import type { MetadataRoute } from "next";
import { PROJECTS } from "@/data/projects";

const BASE = "https://morelidev.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/projetos`, changeFrequency: "monthly", priority: 0.8 },
    ...PROJECTS.map((p) => ({
      url: `${BASE}/projetos/${p.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
