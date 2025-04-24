import { AppRouter } from "@/server/routes";
import { hc } from "hono/client";

export const rpc = hc<AppRouter>(process.env.NEXT_PUBLIC_APP_URL!, {
  init: {
    credentials: "include",
  },
});
