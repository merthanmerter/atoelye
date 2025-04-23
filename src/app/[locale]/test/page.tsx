import RpcResponse from "@/components/rpc-response";
import { getQueryClient } from "@/lib/query-client";
import { rpc } from "@/server/routes";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getTranslations } from "next-intl/server";

export default async function Page() {
  const t = await getTranslations("TestPage");
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["rpcResponseSSR"],
    queryFn: async () => {
      const res = await rpc.api.hello.$get({
        query: { message: "from hono ssr!" },
      });
      return res.json();
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <h1 className='text-2xl font-bold font-mono text-center mx-auto'>
          {t("title")}
        </h1>
        <div className='text-sm text-center mx-auto'>
          {t.rich("description", {
            p: (chunks) => <p className='mt-4'>{chunks}</p>,
            code: (chunks) => (
              <code className='font-mono text-muted-foreground'>{chunks}</code>
            ),
          })}

          {/* <div className='max-w-sm mx-auto my-6 bg-foreground text-background p-3 rounded-md my-2 font-mono text-xs whitespace-pre-line text-ellipsis overflow-hidden break-words'>
            <TestPage user={session?.user} />
          </div>
          <code className='font-mono text-muted-foreground block'>
            {JSON.stringify(rpcResponse)}
          </code> */}
          <RpcResponse queryKey={["rpcResponseSSR"]} />
          <RpcResponse queryKey={["rpcResponseCSR"]} />
        </div>
      </div>
    </HydrationBoundary>
  );
}
