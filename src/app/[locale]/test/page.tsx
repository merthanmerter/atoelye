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
      <div className='max-w-[490px] mx-auto p-20'>
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

          <TestPage user={session?.user} />
        </div>
      </div>
    </HydrationBoundary>
  );
}
