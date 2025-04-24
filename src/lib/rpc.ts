import { AppRouter } from "@/server/routes";
import { isServer } from "@tanstack/react-query";
import { hc } from "hono/client";

let browserRpcClient: ReturnType<typeof hc<AppRouter>> | undefined;

export const getRpcClient = async () => {
  if (isServer) {
    const { headers } = await import("next/headers");
    return hc<AppRouter>(process.env.NEXT_PUBLIC_APP_URL!, {
      init: {
        credentials: "include",
        headers: await headers(),
      },
    });
  } else {
    if (!browserRpcClient) {
      browserRpcClient = hc<AppRouter>(process.env.NEXT_PUBLIC_APP_URL!, {
        init: {
          credentials: "include",
        },
      });
    }
    return browserRpcClient;
  }
};
