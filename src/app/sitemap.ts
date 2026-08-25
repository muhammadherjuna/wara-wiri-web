import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { packages } from "@/data/packages";

export default function sitemap(): MetadataRoute.Sitemap {
  const destinationUrls = packages.map((pkg) => ({
    url: `${siteConfig.url}/destinasi/${pkg.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...destinationUrls,
  ];
}
