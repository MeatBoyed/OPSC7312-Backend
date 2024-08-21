import { handle } from "hono/vercel";
import { logger } from "hono/logger";
import { homeRoute } from "./routes/routes";
import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import newsController from "./controllers/newsController";

const app = new OpenAPIHono({
  defaultHook: (res, c) => {
    console.log("REsss: ", res);
    if (!res.success) {
      return c.json(
        {
          articles: [],
          message: "",
          status: "404",
          totalResults: 2,
        },
        404
      );
    }
  },
})
  // .use(logger())
  .basePath("/api");

app.openapi(homeRoute, (c) => {
  return c.json({ secretNumber: Math.floor(Math.random() * 101).toString() });
});
app.route("/news", newsController);

// Provide Swagger UI for API docs
app.get(
  "/ui",
  swaggerUI({
    url: "/api/doc",
  })
);

// Provide raw JSON for API docs
app.doc("/doc", {
  openapi: "3.0.0",

  info: {
    version: "1.0.0",
    title: "My API",
  },
});

export const GET = handle(app);
