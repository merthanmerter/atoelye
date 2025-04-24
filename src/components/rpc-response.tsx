"use client";

import { getRpcClient } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export default function RpcResponse({
  queryKey,
  initialData,
}: {
  queryKey: [string];
  initialData?: { message: string };
}) {
  const { data, isLoading } = useQuery({
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
    <code className='font-mono block my-3 bg-foreground text-background rounded-md p-2 mx-auto max-w-xs text-xs'>
      {isLoading ? "Loading..." : JSON.stringify(data)}
    </code>
  );
}
