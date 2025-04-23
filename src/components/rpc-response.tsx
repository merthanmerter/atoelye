"use client";

import { rpc } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export default function RpcResponse({ queryKey }: { queryKey: [string] }) {
  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
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
