import { getServerSession } from "@/lib/auth";
import { s3 } from "@/lib/s3";
import { db } from "@/server/db";
import { user } from "@/server/db/schema";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { eq } from "drizzle-orm";
import sharp from "sharp";

export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    const imageKey = session?.user.id;
    if (!imageKey) {
      return Response.json({
        error: "User not found",
        success: false,
      });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const buffer = await file.arrayBuffer();
    const image = sharp(buffer);
    const resizedImage = image.resize({
      width: 150,
      height: 150,
      fit: "cover",
    });
    const webpImage = resizedImage.toFormat("webp");
    const resizedImageBuffer = await webpImage.toBuffer();

    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: imageKey,
      Body: Buffer.from(resizedImageBuffer),
      ContentType: file.type,
    });

    const result = await s3.send(command);
    const url = `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com/atoelye/${imageKey}`;

    await db
      .update(user)
      .set({
        image: imageKey,
      })
      .where(eq(user.id, session?.user.id));

    return Response.json({
      url,
      key: imageKey,
      etag: result.ETag,
      success: true,
    });
  } catch (error) {
    return Response.json({
      error: error instanceof Error ? error.message : "Unknown error",
      success: false,
    });
  }
}

export async function GET() {
  try {
    const session = await getServerSession();
    const imageKey = session?.user.id;
    if (!imageKey) {
      return Response.json({
        error: "User not found",
        success: false,
      });
    }

    // Create a command to generate a presigned URL
    const command = new GetObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: imageKey,
    });

    // Generate a presigned URL that expires in 1 hour (3600 seconds)
    const presignedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

    return Response.json({
      url: presignedUrl,
      success: true,
    });
  } catch (error) {
    return Response.json({
      error:
        error instanceof Error ? error.message : "Failed to retrieve image",
      success: false,
    });
  }
}
