import hono from "@/lib/hono";
import sessionMiddleware from "../middlewares/session";
import { authController } from "./auth";
import { avatarRouter } from "./avatar";
import { helloRouter } from "./hello";
import { newsletterRouter } from "./newsletter";
import { sendRouter } from "./send";

const app = hono().basePath("/api");

const publicRoutes = hono()
  .route("/auth", authController)
  .route("/send", sendRouter)
  .route("/newsletter", newsletterRouter)
  .route("/avatar", avatarRouter);

const privateRoutes = hono()
  .use(sessionMiddleware)
  .route("/hello", helloRouter);

export const appRouter = app.route("/", publicRoutes).route("/", privateRoutes);

export type AppRouter = typeof appRouter;
export default app;
