import { auth } from "@/lib/auth";
import { honoRouter } from "@/lib/hono";
import { s3 } from "@/lib/s3";
import { db } from "@/server/db";
import { user } from "@/server/db/schema";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const avatarRouter = honoRouter()
  .post(
    "/",
    zValidator(
      "form",
      z.object({
        file: z.instanceof(File),
      }),
    ),
    async (c) => {
      try {
        const { file } = c.req.valid("form");
        const session = await auth.api.getSession(c.req.raw);
        const imageKey = session?.user.id;

        if (!imageKey) {
          return c.json(
            {
              error: "User not found",
              success: false,
            },
            401,
          );
        }

        const buffer = await file.arrayBuffer();

        const command = new PutObjectCommand({
          Bucket: process.env.R2_BUCKET_NAME,
          Key: imageKey,
          Body: Buffer.from(buffer),
          ContentType: file.type,
        });

        const result = await s3.send(command);
        const url = `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com/${process.env.R2_BUCKET_NAME}/${imageKey}`;

        await db
          .update(user)
          .set({
            image: imageKey,
          })
          .where(eq(user.id, session?.user.id));

        return c.json({
          url,
          key: imageKey,
          etag: result.ETag,
          success: true,
          message: "Image uploaded successfully",
        });
      } catch (error) {
        console.log(error);
        return c.json(
          {
            error: error instanceof Error ? error.message : "Unknown error",
            success: false,
            message: "Image upload failed",
          },
          500,
        );
      }
    },
  )
  .get("/", async (c) => {
    try {
      const session = await auth.api.getSession(c.req.raw);
      const imageKey = session?.user.id;

      if (!imageKey) {
        return c.json(
          {
            error: "User not found",
            success: false,
          },
          401,
        );
      }

      // Create a command to generate a presigned URL
      const command = new GetObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: imageKey,
      });

      // Generate a presigned URL that expires in 1 hour (3600 seconds)
      const presignedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

      return c.json({
        url: presignedUrl,
        success: true,
      });
    } catch (error) {
      return c.json(
        {
          error:
            error instanceof Error ? error.message : "Failed to retrieve image",
          success: false,
        },
        500,
      );
    }
  });

// client example
// const res = await client.user.picture.$put({
//   form: {
//     file: new File([fileToUpload], filename, {
//       type: fileToUpload.type,
//     }),
//   },
// })
