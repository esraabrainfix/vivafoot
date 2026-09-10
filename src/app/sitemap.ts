import type { MetadataRoute } from "next";

const routes = ["", "technology", "viva-ai", "science", "applications", "team", "about", "contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({ url: `http://localhost:3000/${route}`, lastModified: new Date() }));
}
