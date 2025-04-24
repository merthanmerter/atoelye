"use server";
import { rpc } from "@/lib/rpc";
import { headers } from "next/headers";

export const action = async (template: string) => {
  const res = await rpc.api.hello.$get(
    { query: { message: `from hono ${template}!` } },
    { init: { credentials: "include", headers: await headers() } },
  );
  return res.json();
};
