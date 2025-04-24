"use client";

import { rpc } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export default function RpcResponse({ queryKey }: { queryKey: [string] }) {
  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: () =>
      rpc.api.hello
        .$get(
          {
            query: {
              message:
                "from hono <span style='color: lightblue; font-weight: bold;'>CSR!</span>",
            },
          },
          {
            init: {
              credentials: "include",
            },
          },
        )
        .then((res) => res.text()),
  });

  return (
    <div className='font-mono block my-3 bg-foreground text-background rounded-md p-2 mx-auto max-w-[200px] text-xs'>
      {isLoading ? (
        "Loading..."
      ) : (
        <span dangerouslySetInnerHTML={{ __html: data || "" }} />
      )}
    </div>
  );
}
