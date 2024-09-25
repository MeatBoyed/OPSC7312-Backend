import BusinessService from "@/lib/businessLayer";
import { OpenAPIHono } from "@hono/zod-openapi";
import { HTTPException } from "hono/http-exception";
import { getNewsArticleRoute, getNewsRoute } from "../routes/newsRoutes";

// Defines, Executes the API Routes for the "/news" route.
export default new OpenAPIHono()
  // The "getNewsRoute" is an OpenAPI Zod Schema to provide typesafety and generated documentation
  .openapi(getNewsRoute, async (c) => {
    const { limit, category, offset } = c.req.valid("query"); // type safe values (hover over the categories variable ;)
    console.log("Search Query: ", { limit, category, offset });

    const response = await BusinessService.getArticles(limit, offset, category);
    if (response.err) {
      console.log("Business Service Error in Controller: ", response.val);
      throw response.val;
    }

    return c.json(response.val, 200);
  })
  .openapi(getNewsArticleRoute, async (c) => {
    const response = await BusinessService.getArticlesByTitle(c.req.param("title"));
    if (response instanceof HTTPException) throw response;
    if (response.err) throw response.val;

    return c.json(response.val, 200);
  });
