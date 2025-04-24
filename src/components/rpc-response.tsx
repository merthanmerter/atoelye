"use client";

import { getRpcClient } from "@/lib/rpc";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";

export default function RpcResponse({
  queryKey,
  initialData,
}: {
  queryKey: [string];
  initialData?: { message: string };
}) {
  const { data } = useSuspenseQuery({
    initialData,
    queryKey,
    queryFn: async () => {
      const rpc = await getRpcClient();
      const res = await rpc.api.hello.$get({
        query: { message: "from hono csr!" },
      });
      return res.json();
    },
  });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <code className='font-mono block my-3 bg-foreground text-background rounded-md p-2 mx-auto max-w-xs text-xs'>
        {JSON.stringify(data)}
      </code>
    </Suspense>
  );
}
