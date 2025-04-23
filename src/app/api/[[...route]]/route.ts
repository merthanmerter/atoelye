import { appRouter } from "@/server/routes";
import { Hono } from "hono";

export const runtime = "edge";

const app = new Hono().route("/", appRouter);

export const GET = app.fetch;
export const POST = app.fetch;
