import { Hono } from "hono";
import { hc as honoClient } from "hono/client";
import { helloRouter } from "./hello";

const app = new Hono().basePath("/api");

export const appRouter = app.route("/hello", helloRouter);

export type AppRouter = typeof appRouter;
export const rpc = honoClient<AppRouter>(process.env.NEXT_PUBLIC_APP_URL!);
