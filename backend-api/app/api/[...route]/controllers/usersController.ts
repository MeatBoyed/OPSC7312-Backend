import BusinessService from "@/lib/businessLayer";
import { OpenAPIHono } from "@hono/zod-openapi";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { deleteUserFavouritesRoute, getUserRoute, getUsersFavouritesRoute, postUserFavouritesRoute } from "../routes/usersRoutes";
import { exampleArticle, exampleUser } from "@/lib/openapiConfig";

const BusinessLayer = new BusinessService();

export default new OpenAPIHono()
  .openapi(getUserRoute, async (c) => {
    const { user_id } = c.req.valid("param");
    if (user_id !== exampleUser.uid) throw new HTTPException(404, { message: "User not found" });
    return c.json(
      {
        status: "ok",
        user: exampleUser,
      },
      200
    );
  })
  .openapi(getUsersFavouritesRoute, async (c) => {
    const { user_id } = c.req.valid("param");
    if (user_id !== exampleUser.uid) throw new HTTPException(404, { message: "User not found" });
    return c.json(
      {
        total: 1,
        status: "ok",
        favourites: [exampleArticle],
      },
      200
    );
  })
  .openapi(postUserFavouritesRoute, async (c) => {
    const { user_id } = c.req.valid("param");
    const articlePayload = c.req.valid("json");
    if (user_id !== exampleUser.uid) throw new HTTPException(404, { message: "User not found" });
    return c.json(
      {
        status: "ok",
        favourites: [articlePayload, articlePayload],
        total: 2,
      },
      200
    );
  })
  .openapi(deleteUserFavouritesRoute, async (c) => {
    const { user_id } = c.req.valid("param");
    if (user_id !== exampleUser.uid) throw new HTTPException(404, { message: "User not found" });
    const articlePayload = c.req.valid("json");
    return c.json(
      {
        status: "ok",
        favourites: [articlePayload],
        total: 1,
      },
      200
    );
  });
//   .get("/:source", async (c) => {
//     const source = c.req.param("source");

//     const articles = await News.getArticlesBySource(source);
//     const successResponse = makeSuccessResponse(articles);
//     return c.json(successResponse);
//   });
