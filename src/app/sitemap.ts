import { MetadataRoute } from "next";
import { publishedServices } from "../lib/services";

const BASE = "https://jojopropertyservices.co.uk";

// Last-modified dates. Update a date only when that page's content really changes.
// (Using new Date() would say every page changed on every request, and Google learns to ignore that.)
const HOME_UPDATED     = new Date("2026-10-28");
const SERVICES_UPDATED = new Date("2026-10-28");
const BOOKING_UPDATED  = new Date("2026-10-28");
const ABOUT_UPDATED    = new Date("2026-10-28");
const PRIVACY_UPDATED  = new Date("2026-10-28");

export default function sitemap(): MetadataRoute.Sitemap {
  // Service pages appear here automatically once published: true in lib/services.ts
  const servicePages: MetadataRoute.Sitemap = publishedServices().map((s) => ({
    url: `${BASE}/${s.slug}`,
    lastModified: SERVICES_UPDATED,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  return [
    {
      url: `${BASE}/`, // trailing slash matches the homepage canonical ("/")
      lastModified: HOME_UPDATED,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...servicePages,
    {
      url: `${BASE}/booking`,
      lastModified: BOOKING_UPDATED,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE}/about`,
      lastModified: ABOUT_UPDATED,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE}/privacy-policy`,
      lastModified: PRIVACY_UPDATED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}