import RefetchHello from "@/components/refetch-hello";
import RpcResponse from "@/components/rpc-response";
import SendTestEmail from "@/components/send-test-email";
import { getRpcClient } from "@/lib/rpc";
import { getTranslations } from "next-intl/server";
// import { getQueryClient } from "@/lib/query-client";
// import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function Page() {
  const t = await getTranslations("TestPage");
  // const queryClient = getQueryClient();
  // await queryClient.prefetchQuery({
  //   queryKey: ["rpcResponseSSR"],
  //   queryFn: async () => {
  //     const rpc = await getRpcClient();
  //     const res = await rpc.api.hello.$get({
  //       query: { message: "from hono ssr!" },
  //     });
  //     return res.json();
  //   },
  // });

  const rpc = await getRpcClient();
  const res = await rpc.api.hello.$get({
    query: { message: "from hono ssr!" },
  });
  const initialData = await res.json();

  return (
    // <HydrationBoundary state={dehydrate(queryClient)}>
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

        <RpcResponse
          initialData={initialData}
          queryKey={["rpcResponseSSR"]}
        />
        <RpcResponse queryKey={["rpcResponseCSR"]} />
        <div className='flex gap-2 mt-4 justify-center items-center'>
          <RefetchHello />
          <SendTestEmail />
        </div>
      </div>
    </div>
    // </HydrationBoundary>
  );
}
