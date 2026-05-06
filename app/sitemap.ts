import { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
    "/polityka-prywatnosci",
  ];

  const staticRoutes = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const supabase = await createClient();

  const { data: cats } = await supabase
    .from("cats")
    .select("slug, updated_at")
    .is("deleted_at", null);

  const catRoutes =
    cats?.map((cat) => ({
      url: `${baseUrl}/koty/${cat.slug}`,
      lastModified: new Date(cat.updated_at ?? new Date()),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })) ?? [];

  return [...staticRoutes, ...catRoutes];
}