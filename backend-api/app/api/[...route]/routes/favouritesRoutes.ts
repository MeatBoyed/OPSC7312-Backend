import { userIdSchema } from "@/schemas";
import { ErrorUserResponseSchema, SuccessUserResponseSchema } from "@/schemas/userResponses";
import { createRoute, z } from "@hono/zod-openapi";

export const getUsersFavouritesRoute = createRoute({
  method: "get",
  path: "/:user_id/favourites",
  request: {
    params: z.object({
      user_id: userIdSchema,
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
          schema: SuccessUserResponseSchema,
        },
      },
      description: "Get a specific article by its title",
    },
    404: {
      content: {
        "application/json": {
          schema: ErrorUserResponseSchema,
        },
      },
      description: "No article found with that title",
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
