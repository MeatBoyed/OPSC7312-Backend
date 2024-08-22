import { z } from "@hono/zod-openapi";
import { ArticleSchema, RSSArticleSchema } from ".";
import { exampleArticle, exampleUser } from "@/lib/openapiConfig";

const UserSchema = z.object({
  uid: z.string(),
  displayName: z.string().optional(),
  email: z.string().email().optional(),
  photoURL: z.string().url().optional(),
  phoneNumber: z.string().optional(),
  providerId: z.string().optional(),
  creationTime: z.date().optional(),
  lastSignInTime: z.date().optional(),
  favourites: z.array(z.string()).optional(),
});
export type User = z.infer<typeof UserSchema>;

// User
export const SuccessUserResponseSchema = z
  .object({
    status: z.string().openapi({
      example: "ok",
      description: "The status of the response",
    }),
    user: UserSchema.openapi({
      example: exampleUser,
      description: "The user's data",
    }),
  })
  .openapi("User Success Res", { description: "The (Default) Success response object for the /User Routes." });
export type SuccessUserResponse = z.infer<typeof SuccessUserResponseSchema>;
export const ErrorUserResponseSchema = z
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
  .openapi("User Error Res", { description: "The (default) Error response object for the /User Routes." });
export type ErrorUserResponse = z.infer<typeof ErrorUserResponseSchema>;

// /User/Favourites
export const SuccessFavouritesResponseSchema = z
  .object({
    status: z.string().openapi({
      example: "ok",
      description: "The status of the response",
    }),
    favourites: z.array(ArticleSchema).openapi({
      example: [exampleArticle],
      description: "The user's data",
    }),
    total: z.number().openapi({
      example: 10,
      description: "The total number of results",
    }),
  })
  .openapi("User Favourites Success Res", {
    description: "The (Default) Success response object for the /User/favourites Routes.",
  });
export type SuccessFavouritesResponse = z.infer<typeof SuccessFavouritesResponseSchema>;

export const ErrorFavouritesResponseSchema = z
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
  .openapi("Ussers Favourites Error Res", {
    description: "The (Default) Success response object for the /User/favourites Routes.",
  });
export type ErrorFavouritesResponse = z.infer<typeof ErrorFavouritesResponseSchema>;
