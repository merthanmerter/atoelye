import { avatarRouter } from "@/server/routes/avatar";
import { helloRouter } from "@/server/routes/hello";
import { newsletterRouter } from "@/server/routes/newsletter";
import { sendRouter } from "@/server/routes/send";
import { Hono } from "hono";

export const runtime = "edge";

const app = new Hono().basePath("/api");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const appRouter = app
  .route("/hello", helloRouter)
  .route("/send", sendRouter)
  .route("/newsletter", newsletterRouter)
  .route("/avatar", avatarRouter);

export type AppRouter = typeof appRouter;
export const GET = app.fetch;
export const POST = app.fetch;
