import { createRoute, z } from "@hono/zod-openapi";
import { ErrorNewsResponseSchema, HomeResponseSchema, SuccessNewsResponseSchema } from "@/schemas/responses";

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
        example: "Jacob%Zuma%did%20something%crazy",
        description:
          "Ensure that the title is url encoded (i.e. normal title: 'Jacob Zuma did something crazy', encoded title: Jacob%Zuma%did%20something%crazy)",
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
