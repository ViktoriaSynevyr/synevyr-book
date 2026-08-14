import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://synevyr-book.vercel.app";
  const languages = ["uk", "en", "es"] as const;

  const pages: MetadataRoute.Sitemap = [];

  for (const lang of languages) {
    pages.push({
      url: baseUrl + "/" + lang,
      lastModified: new Date(),
    });

    pages.push({
      url: baseUrl + "/" + lang + "/reading",
      lastModified: new Date(),
    });

    pages.push({
      url: baseUrl + "/" + lang + "/reading/prologue",
      lastModified: new Date(),
    });

    for (let chapter = 1; chapter <= 22; chapter++) {
      pages.push({
        url:
          baseUrl +
          "/" +
          lang +
          "/reading/chapters/" +
          chapter,
        lastModified: new Date(),
      });
    }

    pages.push({
      url: baseUrl + "/" + lang + "/reading/epilogue",
      lastModified: new Date(),
    });

    pages.push({
      url: baseUrl + "/" + lang + "/folklore",
      lastModified: new Date(),
    });

    pages.push({
      url: baseUrl + "/" + lang + "/author",
      lastModified: new Date(),
    });
  }

  return pages;
}