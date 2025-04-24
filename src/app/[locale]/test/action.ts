"use server";
import { rpc } from "@/lib/rpc";
import { headers } from "next/headers";

export const sayHello = async (message: string) => {
  const res = await rpc.api.hello.$get(
    {
      query: {
        message,
      },
    },
    {
      init: {
        credentials: "include",
        headers: new Headers(await headers()),
      },
    },
  );
  return await res.json();
};
