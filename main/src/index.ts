import { handleError } from "@/exceptions";
import { ServerException } from "@/exceptions/server";
import NewsRepository from "@/lib/news";
import { getRandomNews, getSourceNews } from "@/lib/news/newsScraper";
import { validateSource } from "@/lib/news/utils";
import { makeSuccessResponse } from "@/lib/utils";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import newsController from "./controllers/newsController";

const app = new Hono().use(logger()).basePath("/api");

app.route("/news", newsController);

const port = 3000;
console.log(`Server is running on port ${port} - http://localhost:${port}/api/`);

serve({
  fetch: app.fetch,
  port,
});
