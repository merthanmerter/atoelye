import { AppRouter } from "@/app/api/[[...route]]/route";
import { hc } from "hono/client";

export const rpc = hc<AppRouter>(process.env.NEXT_PUBLIC_APP_URL!);
