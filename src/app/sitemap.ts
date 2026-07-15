import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://jojopropertyservices.co.uk",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://jojopropertyservices.co.uk/booking",
      lastModified: new Date(),
    },
    {
      url: "https://jojopropertyservices.co.uk/services",
      lastModified: new Date(),
    },
    {
      url: "https://jojopropertyservices.co.uk/contact",
      lastModified: new Date(),
    },
  ];
}