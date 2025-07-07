import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { headers } from 'next/headers';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import RefetchHello from '@/components/refetch-hello';
import RpcResponse from '@/components/rpc-response';
import SendTestEmail from '@/components/send-test-email';
import { getQueryClient } from '@/lib/query-client';
import { rpc } from '@/lib/rpc';

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const t = await getTranslations('DocsPage');
  const { locale } = await params;
  setRequestLocale(locale);
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['rpcResponseSSR'],
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
              credentials: 'include',
              headers: new Headers(await headers()),
            },
          }
        )
        .then((res) => res.text()),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="mx-auto max-w-7xl py-6">
        <h1 className="mx-auto text-center font-bold font-mono text-2xl">
          {t('title')}
        </h1>
        <div className="mx-auto text-center text-sm">
          {t.rich('description', {
            p: (chunks) => <p className="mt-4">{chunks}</p>,
            code: (chunks) => (
              <code className="font-mono text-muted-foreground">{chunks}</code>
            ),
          })}

          <RpcResponse queryKey={['rpcResponseSSR']} />
          <RpcResponse queryKey={['rpcResponseCSR']} />
          <div className="mt-4 flex items-center justify-center gap-2">
            <RefetchHello />
            <SendTestEmail />
          </div>
        </div>
      </div>
    </HydrationBoundary>
  );
}
