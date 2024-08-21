import { z } from "@hono/zod-openapi";
import { ArticleSchema, RSSArticleSchema } from ".";

export const HomeResponseSchema = z
  .object({
    secretNumber: z.string().openapi({
      example: "An acknowledgment message, of a random 'secret' number",
    }),
  })
  .openapi("Home Res");

export const SuccessNewsResponseSchema = z
  .object({
    status: z.string().openapi({
      example: "ok",
      description: "The status of the response",
    }),
    totalResults: z.number().openapi({
      example: 10,
      description: "The total number of results",
    }),
    articles: z.array(ArticleSchema).openapi({
      example: [
        {
          title: "Jacob Zuma did something crazy",
          link: "https://news24.com/ts/Jacob%Zuma%did%20something%crazy",
          description: "Description of the article",
          content: "content",
          pubDate: "pubDate",
          thumbnail: "thumbnail",
          preview: "a shorted version of the articles content",
        },
      ],
      description: "The sourced articles. When querying for a single Article, that specific article will be stored here.",
    }),
  })
  .openapi("News Success Res", { description: "The (Default) Success response object for the /News Routes." });
export type SuccessNewsResponse = z.infer<typeof SuccessNewsResponseSchema>;

export const ErrorNewsResponseSchema = z
  .object({
    status: z.string().openapi({
      example: "ok",
      description: "The status of the response",
    }),
    message: z.string().openapi({
      example: "Something went wrong, some where",
      description: "The error message",
    }),
  })
  .openapi("News Error Res", { description: "The (default) Error response object for the /News Routes." });
export type ErrorNewsResponse = z.infer<typeof ErrorNewsResponseSchema>;
