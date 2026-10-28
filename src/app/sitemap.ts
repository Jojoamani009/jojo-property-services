import { MetadataRoute } from "next";
import { publishedServices } from "../lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  // Service pages appear here automatically once published: true in lib/services.ts
  const servicePages: MetadataRoute.Sitemap = publishedServices().map((s) => ({
    url: `https://jojopropertyservices.co.uk/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  return [
    {
      url: "https://jojopropertyservices.co.uk",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...servicePages,
    {
      url: "https://jojopropertyservices.co.uk/booking",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://jojopropertyservices.co.uk/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: "https://jojopropertyservices.co.uk/privacy-policy",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
