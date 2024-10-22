import { createRoute, z } from "@hono/zod-openapi";
import {
  ErrorNewsResponseSchema,
  HomeResponseSchema,
  SuccessNewsResponseSchema,
} from "@/schemas/newsResponses";
import { exampleArticle } from "@/lib/openapiConfig";
import { categoryTypeEnum } from "@/lib/news";

export const homeRoute = createRoute({
  method: "get",
  path: "/hello",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: HomeResponseSchema,
        },
      },
      description: "Used to acknowledge that the server is online",
    },
  },
});

export const getNewsRoute = createRoute({
  method: "get",
  path: "/",
  request: {
    query: z.object({
      limit: z.number().optional().openapi({
        example: 10,
        description: "The number of news articles to return",
      }),
      offset: z.number().optional().openapi({
        example: 0,
        description: "The number of news articles to skip. Used for Pagination",
      }),
      category: categoryTypeEnum.optional(),
    }),
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: SuccessNewsResponseSchema,
        },
      },
      description: "Get all Top Story articles",
    },
    500: {
      content: {
        "application/json": {
          schema: ErrorNewsResponseSchema,
        },
      },
      description: "An internal server error ocurred. Check Server logs to debug.",
    },
  },
});

export const getNewsArticleRoute = createRoute({
  method: "get",
  path: "/:title",
  request: {
    params: z.object({
      title: z.string().openapi({
        param: {
          name: "title",
          in: "path",
        },
        example: exampleArticle.title,
        description: `Ensure that the title is url encoded (i.e. normal title: '${
          exampleArticle.title
        }', encoded title: ${encodeURI(exampleArticle.title)})`,
      }),
    }),
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: SuccessNewsResponseSchema,
        },
      },
      description: "Get a specific article by its title",
    },
    404: {
      content: {
        "application/json": {
          schema: ErrorNewsResponseSchema,
        },
      },
      description: "No article found with that title",
    },
    500: {
      content: {
        "application/json": {
          schema: ErrorNewsResponseSchema,
        },
      },
      description: "An internal server error ocurred. Check Server logs to debug.",
    },
  },
});
