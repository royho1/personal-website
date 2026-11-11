import type { MetadataRoute } from "next";

const siteUrl = "https://www.royho-career.com";

const userAgents = [
  "*",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "PerplexityBot",
  "Google-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: userAgents.map((userAgent) => ({
      userAgent,
      allow: "/",
      disallow: ["/api/", "/atlas-inbox"],
    })),
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
