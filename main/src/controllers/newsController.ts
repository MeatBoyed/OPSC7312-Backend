import BusinessService from "@/lib/businessLayer";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

const BusinessLayer = new BusinessService();

export default new Hono()
  .get("/", async (c) => {
    const response = await BusinessLayer.getArticles();
    if (response instanceof HTTPException) throw response;
    return c.json(response);
  })
  .get("/:title", async (c) => {
    const response = await BusinessLayer.getArticlesByTitle(c.req.param("title"));
    if (response instanceof HTTPException) throw response;
    return c.json(response);
  });
//   .get("/:source", async (c) => {
//     const source = c.req.param("source");

//     const articles = await News.getArticlesBySource(source);
//     const successResponse = makeSuccessResponse(articles);
//     return c.json(successResponse);
//   });
