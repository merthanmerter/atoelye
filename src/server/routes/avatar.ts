import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

export const avatarRouter = new Hono().post(
  "/",
  zValidator(
    "form",
    z.object({
      file: z.instanceof(File),
    }),
  ),
  (c) => {
    const { file } = c.req.valid("form");
    // to be implemented
    return c.json({
      message: `${file}`,
    });
  },
);
