'use client';

import { useQuery } from '@tanstack/react-query';
import { rpc } from '@/lib/rpc';

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
              credentials: 'include',
            },
          }
        )
        .then((res) => res.text()),
  });

  return (
    <div className="mx-auto my-3 block max-w-[200px] rounded-md bg-foreground p-2 font-mono text-background text-xs">
      {isLoading ? (
        'Loading...'
      ) : (
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Under control
        <span dangerouslySetInnerHTML={{ __html: data || '' }} />
      )}
    </div>
  );
}
