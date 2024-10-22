import { ArticleSchema, userIdSchema } from "@/schemas";
import {
  ErrorFavouritesResponseSchema,
  ErrorUserResponseSchema,
  SuccessFavouritesResponseSchema,
  SuccessUserResponseSchema,
} from "@/schemas/userResponses";
import { createRoute, z } from "@hono/zod-openapi";

export const getUserRoute = createRoute({
  method: "get",
  path: "/:user_id",
  request: {
    params: z.object({
      user_id: userIdSchema,
    }),
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: SuccessUserResponseSchema,
        },
      },
      description: "Retrieve a user from the database.",
    },
    401: {
      content: {
        "application/json": {
          schema: ErrorUserResponseSchema,
        },
      },
      description: "An unauthorized request was made to the server.",
    },
    404: {
      content: {
        "application/json": {
          schema: ErrorUserResponseSchema,
        },
      },
      description: "No user found with that user id",
    },
    500: {
      content: {
        "application/json": {
          schema: ErrorUserResponseSchema,
        },
      },
      description: "An internal server error ocurred. Check Server logs to debug.",
    },
  },
});

export const getUsersFavouritesRoute = createRoute({
  method: "get",
  path: "/:user_id/favourites",
  request: {
    params: z.object({
      user_id: userIdSchema,
    }),
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: SuccessFavouritesResponseSchema,
        },
      },
      description: "Get a specific User's Favourites",
    },
    500: {
      content: {
        "application/json": {
          schema: ErrorFavouritesResponseSchema,
        },
      },
      description: "An internal server error ocurred. Check Server logs to debug.",
    },
  },
});

export const postUserFavouritesRoute = createRoute({
  method: "post",
  path: "/:user_id/favourites",
  request: {
    params: z.object({
      user_id: userIdSchema,
    }),
    body: {
      content: {
        "application/json": {
          schema: ArticleSchema,
        },
      },
      description: "The article to add to the User's favourites",
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: SuccessFavouritesResponseSchema,
        },
      },
      description: "The article was successfully updated to the User's favourites",
    },
    500: {
      content: {
        "application/json": {
          schema: ErrorFavouritesResponseSchema,
        },
      },
      description: "An internal server error ocurred. Check Server logs to debug.",
    },
  },
});

export const deleteUserFavouritesRoute = createRoute({
  method: "delete",
  path: "/:user_id/favourites",
  request: {
    params: z.object({
      user_id: userIdSchema,
    }),
    body: {
      content: {
        "application/json": {
          schema: ArticleSchema,
        },
      },
      description: "The article to remove from the User's favourites",
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: SuccessFavouritesResponseSchema,
        },
      },
      description: "The article was successfully deleted to the User's favourites",
    },
    500: {
      content: {
        "application/json": {
          schema: ErrorFavouritesResponseSchema,
        },
      },
      description: "An internal server error ocurred. Check Server logs to debug.",
    },
  },
});
