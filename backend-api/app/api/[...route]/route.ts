import { handle } from "hono/vercel";
import { homeRoute } from "./routes/newsRoutes";
import { OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";

import { description } from "@/lib/openapiConfig";

import newsController from "./controllers/newsController";
import usersController from "./controllers/usersController";

const app = new OpenAPIHono().basePath("/api");

app.openapi(homeRoute, (c) => {
  return c.json({ secretNumber: Math.floor(Math.random() * 101).toString() });
});
app.route("/news", newsController);
app.route("/users", usersController);

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
    title: "OPSC7312-Backend API Documentation",
    description: description,
  },
});

export const GET = handle(app);
