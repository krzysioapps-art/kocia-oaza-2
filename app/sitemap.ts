import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://kocia-oaza.pl";

  const routes = [
    "",
    "/koty",
    "/jak-adoptowac",
    "/jak-pomagamy",
    "/dom-tymczasowy",
    "/o-nas",
    "/porady",
    "/aktualnosci",
    "/dolacz-do-nas",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}