import BusinessService from "@/lib/businessLayer";
import { OpenAPIHono } from "@hono/zod-openapi";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { getNewsArticleRoute, getNewsRoute } from "../routes/newsRoutes";

const BusinessLayer = new BusinessService();

export default new OpenAPIHono()
  .openapi(getNewsRoute, async (c) => {
    const response = await BusinessLayer.getArticles();
    if (response instanceof HTTPException) throw response;
    return c.json(response, 200);
  })
  .openapi(getNewsArticleRoute, async (c) => {
    const response = await BusinessLayer.getArticlesByTitle(c.req.param("title"));
    if (response instanceof HTTPException) throw response;
    return c.json(response, 200);
  });
//   .get("/:source", async (c) => {
//     const source = c.req.param("source");

//     const articles = await News.getArticlesBySource(source);
//     const successResponse = makeSuccessResponse(articles);
//     return c.json(successResponse);
//   });
