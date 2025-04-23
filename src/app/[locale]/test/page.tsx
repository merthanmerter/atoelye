import RpcResponse from "@/components/rpc-response";
import SendTestEmail from "@/components/send-test-email";
import { getQueryClient } from "@/lib/query-client";
import { rpc } from "@/lib/rpc";
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

          <RpcResponse queryKey={["rpcResponseSSR"]} />
          <RpcResponse queryKey={["rpcResponseCSR"]} />
          <SendTestEmail />
        </div>
      </div>
    </HydrationBoundary>
  );
}
