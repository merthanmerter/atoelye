"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, redirect } from "@/i18n/navigation";
import { signOut } from "@/lib/auth-client";
import { useQueryClient } from "@tanstack/react-query";
import { createAuthClient } from "better-auth/react";
import { Loader2, UserRoundIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import { Card, CardContent, CardFooter } from "./ui/card";

const { useSession } = createAuthClient();

export default function UserProfile() {
  const { data: session, isPending: isSessionPending, error } = useSession();
  const t = useTranslations("HomePage");
  const locale = useLocale();
  const queryClient = useQueryClient();

  const handleSignOut = async () => {
    queryClient.resetQueries();
    await signOut({
      fetchOptions: {
        credentials: "include",
        onResponse: () => {},
        onSuccess: () => {
          redirect({ href: "/login", locale });
          toast.success("Signed out successfully");
        },
      },
    });
  };

  return (
    <Card className='mx-auto min-w-xs max-w-md my-12'>
      <CardContent className='grid place-items-center gap-2'>
        {isSessionPending ? (
          <>
            <Skeleton className='w-24 h-24 rounded-full' />
            <Skeleton className='w-42 h-3.5' />
            <Skeleton className='w-36 h-3.5' />
          </>
        ) : error || !session ? (
          <p className='text-sm leading-none text-muted-foreground'>
            {t("notLoggedIn")}
          </p>
        ) : (
          <>
            <UserRoundIcon className='w-24 h-24 text-foreground border-5 border-muted rounded-full bg-muted' />
            <p className='text-sm leading-none font-bold'>
              {session?.user?.name}
            </p>
            <p className='text-sm leading-none text-muted-foreground'>
              {session?.user?.email}
            </p>
          </>
        )}
      </CardContent>

      <CardFooter className='mx-auto'>
        {session ? (
          <Button
            disabled={isSessionPending}
            className='min-w-28'
            onClick={handleSignOut}>
            {isSessionPending ? (
              <Loader2
                size={16}
                className='animate-spin'
              />
            ) : (
              t("signOut")
            )}
          </Button>
        ) : isSessionPending ? (
          <Skeleton className='w-28 h-9' />
        ) : (
          <Button
            className='min-w-28'
            asChild>
            <Link href='/login'>{t("signIn")}</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
