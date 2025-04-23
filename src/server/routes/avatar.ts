import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

export const avatarRouter = new Hono().put(
  "/",
  zValidator(
    "form",
    z.object({
      file: z.instanceof(File),
    }),
  ),
  (c) => {
    const { file } = c.req.valid("form");
    console.log(file);
    // to be implemented
    return c.json({});
  },
);

// client example
// const res = await client.user.picture.$put({
//   form: {
//     file: new File([fileToUpload], filename, {
//       type: fileToUpload.type,
//     }),
//   },
// })
