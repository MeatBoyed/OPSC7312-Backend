import { Hono } from "hono";
import { handle } from "hono/vercel";
import newsController from "./controllers/newsController";

export const runtime = "edge";

const app = new Hono().basePath("/api");

app.get("/", (c) => {
  return c.json({ message: "Hello from OPSC Database API!", secretNumber: Math.floor(Math.random() * 101) });
});
app.route("/news", newsController);

export const GET = handle(app);
