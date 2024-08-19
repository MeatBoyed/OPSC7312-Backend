import { Hono } from "hono";
import { handle } from "hono/vercel";
import newsController from "./controllers/newsController";

export const runtime = "edge";

const app = new Hono().basePath("/api");

app.route("/news", newsController);

export const GET = handle(app);
