import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

export const helloRouter = new Hono().get(
  "/",
  zValidator(
    "query",
    z.object({
      message: z.string(),
    }),
  ),
  (c) => {
    const { message } = c.req.valid("query");
    return c.json({
      message: `Hello ${message}`,
    });
  },
);
