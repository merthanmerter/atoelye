import TestPage from "@/components/test-page";
import { getServerSession } from "@/lib/auth";
import { getQueryClient } from "@/lib/query-client";
import { getUserById } from "@/server/proxy/get-user-by-id";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getTranslations } from "next-intl/server";

export default async function Page() {
  const session = await getServerSession();
  const t = await getTranslations("TestPage");
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["user", session?.user.id],
    queryFn: () => getUserById(session?.user.id),
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
          <div className='max-w-sm mx-auto my-6 bg-foreground text-background p-3 rounded-md my-2 font-mono text-xs whitespace-pre-line text-ellipsis overflow-hidden break-words'>
            <TestPage user={session?.user} />
          </div>
        </div>
      </div>
    </HydrationBoundary>
  );
}
