"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { redirect } from "@/i18n/navigation";
import { signOut } from "@/lib/auth-client";
import { createAuthClient } from "better-auth/react";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { use, useState } from "react";
import { toast } from "sonner";
const { useSession } = createAuthClient();

export default function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { data: session, isPending, error } = useSession();
  const { locale } = use(params);
  const t = useTranslations("HomePage");
  const [loading, setLoading] = useState(false);

  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-20 gap-16 font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col gap-[32px] row-start-2 items-center sm:items-start'>
        <h1 className='text-2xl font-bold font-mono text-center mx-auto'>
          {t("title")}
        </h1>
        <div className='flex flex-col items-center gap-2 mx-auto text-sm'>
          {isPending ? (
            <>
              <Skeleton className='w-24 h-24 rounded-full' />
              <Skeleton className='w-36 h-4' />
              <Skeleton className='w-36 h-4' />
            </>
          ) : error || !session ? (
            <p className='text-sm leading-none text-muted-foreground'>
              {t("notLoggedIn")}
            </p>
          ) : (
            <>
              <Image
                src={session?.user?.image ?? ""}
                alt='Avatar'
                className='w-24 h-24 rounded-full'
                width={96}
                height={96}
                priority
              />
              <p className='text-sm leading-none font-bold'>
                {session?.user?.name}
              </p>
              <p className='text-sm leading-none text-muted-foreground'>
                {session?.user?.email}
              </p>
            </>
          )}
        </div>
      </main>
      <footer className='row-start-3 flex gap-[24px] flex-wrap items-center justify-center'>
        {session ? (
          <Button
            disabled={loading}
            className='min-w-28'
            onClick={async () =>
              await signOut({
                fetchOptions: {
                  credentials: "include",
                  onRequest: () => {
                    setLoading(true);
                  },
                  onResponse: () => {
                    setLoading(false);
                  },
                  onSuccess: () => {
                    redirect({ href: "/login", locale });
                    toast.success("Signed out successfully");
                  },
                },
              })
            }>
            {loading ? (
              <Loader2
                size={16}
                className='animate-spin'
              />
            ) : (
              t("signOut")
            )}
          </Button>
        ) : (
          <Button
            className='min-w-28'
            asChild>
            <Link href='/login'>{t("signIn")}</Link>
          </Button>
        )}
      </footer>
    </div>
  );
}
