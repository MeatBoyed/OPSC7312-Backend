import { z } from "zod";

export * from "./responses";

export const RSSArticleSchema = z.object({
  title: z.string(),
  link: z.string(),
  description: z.string().optional(),
  pubDate: z.string(),
  thumbnail: z.string().optional(),
});
export const ArticleSchema = z.object({
  title: z.string(),
  link: z.string(),
  description: z.string(),
  pubDate: z.string(),
  thumbnail: z.string().optional(),
  content: z.string(),
  preview: z.string(),
});
export type Article = z.infer<typeof ArticleSchema>;
export type RSSArticle = z.infer<typeof RSSArticleSchema>;
