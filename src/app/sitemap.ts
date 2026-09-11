import type { MetadataRoute } from "next";

const routes = ["", "technology", "viva-ai", "science", "applications", "team", "about", "contact"];
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({ url: `${siteUrl}/${route}`, lastModified: new Date() }));
}
