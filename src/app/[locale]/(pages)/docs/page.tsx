import RefetchHello from "@/components/refetch-hello";
import RpcResponse from "@/components/rpc-response";
import SendTestEmail from "@/components/send-test-email";
import { getQueryClient } from "@/lib/query-client";
import { rpc } from "@/lib/rpc";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { headers } from "next/headers";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const t = await getTranslations("DocsPage");
  const { locale } = await params;
  setRequestLocale(locale);
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["rpcResponseSSR"],
    queryFn: async () =>
      rpc.api.hello
        .$get(
          {
            query: {
              message:
                "from hono <span style='color: coral; font-weight: bold;'>SSR!</span>",
            },
          },
          {
            init: {
              credentials: "include",
              headers: new Headers(await headers()),
            },
          },
        )
        .then((res) => res.text()),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className='py-6 max-w-7xl mx-auto'>
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
          <div className='flex gap-2 mt-4 justify-center items-center'>
            <RefetchHello />
            <SendTestEmail />
          </div>
        </div>
      </div>
    </HydrationBoundary>
  );
}
