import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://synevyr-book.vercel.app/uk",
      lastModified: new Date(),
    },
    {
      url: "https://synevyr-book.vercel.app/en",
      lastModified: new Date(),
    },
    {
      url: "https://synevyr-book.vercel.app/es",
      lastModified: new Date(),
    },
  ];
}