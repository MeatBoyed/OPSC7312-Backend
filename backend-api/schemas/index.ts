import { exampleUser } from "@/lib/openapiConfig";
import { z } from "zod";

export const RSSArticleSchema = z.object({
  title: z.string(),
  link: z.string(),
  description: z.string().optional(),
  pubDate: z.string(),
  thumbnail: z.string().optional(),
});
export type RSSArticle = z.infer<typeof RSSArticleSchema>;

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

export const userIdSchema = z.string().openapi({
  param: {
    name: "user_id",
    in: "path",
  },
  example: exampleUser.uid, // example CUID
  description:
    "The public Id of the User. This should be a CUID (or Firestore's type), and preferably but a safe public ID to expose.",
});

export * from "./newsResponses";
