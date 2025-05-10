"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, redirect } from "@/i18n/navigation";
import { signOut } from "@/lib/auth-client";
import { resizeImage } from "@/lib/resize-image";
import { rpc } from "@/lib/rpc";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createAuthClient } from "better-auth/react";
import { Loader2, Upload } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Input } from "./ui/input";

const { useSession } = createAuthClient();

export default function UserProfile() {
  const { data: session, isPending: isSessionPending, error } = useSession();
  const t = useTranslations("HomePage");
  const locale = useLocale();
  const queryClient = useQueryClient();
  const [isAuthenticating, setAuthenticating] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const { data: avatarData, isFetching: isAvatarLoading } = useQuery({
    queryKey: ["avatar"],
    queryFn: async ({ signal }) => {
      if (!session || isAuthenticating || !session.user.image) {
        return null;
      }
      const res = await rpc.api.avatar.$get({ signal });
      if (res.ok) return await res.json();
      return null;
    },
    enabled: !!session?.user.image,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size > 1024 * 1024) {
      toast.error("File size must be less than 1MB");
      return;
    }
    if (file) {
      setFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (file) {
      uploadImageToCloudflareR2();
    }
  };

  const { mutate: uploadImageToCloudflareR2, isPending: isUploading } =
    useMutation({
      mutationFn: async () => {
        if (!file) return;
        const res = await rpc.api.avatar.$post({
          form: {
            file: await resizeImage(file, {
              maxHeight: 150,
              maxWidth: 150,
            }),
          },
        });
        if (res.ok) return await res.json();
        return null;
      },
      onSuccess: async (data) => {
        toast.success(data?.message);
        queryClient.invalidateQueries({ queryKey: ["avatar"] });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  const handleSignOut = async () => {
    setAuthenticating(true);
    queryClient.resetQueries();
    await signOut({
      fetchOptions: {
        credentials: "include",
        onResponse: () => {
          setAuthenticating(false);
        },
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
            <Skeleton className='w-60 h-9 mt-3' />
          </>
        ) : error || !session ? (
          <p className='text-sm leading-none text-muted-foreground'>
            {t("notLoggedIn")}
          </p>
        ) : (
          <>
            {isAvatarLoading ? (
              <Skeleton className='w-24 h-24 rounded-full' />
            ) : (
              session?.user.image &&
              avatarData?.url && (
                <Avatar className='size-24 border-2'>
                  <AvatarImage
                    src={avatarData?.url}
                    alt='Avatar'
                    width={150}
                    height={150}
                  />
                </Avatar>
              )
            )}

            <p className='text-sm leading-none font-bold'>
              {session?.user?.name}
            </p>
            <p className='text-sm leading-none text-muted-foreground'>
              {session?.user?.email}
            </p>
            <form
              className='relative max-w-60 mt-3'
              onSubmit={handleSubmit}>
              <Input
                accept='image/*'
                type='file'
                name='file'
                onChange={handleFileChange}
              />
              <Button
                size='icon'
                variant='default'
                className='absolute top-1 right-1 size-7 z-10'
                disabled={isUploading}>
                {isUploading ? (
                  <Loader2 className='animate-spin' />
                ) : (
                  <Upload />
                )}
              </Button>
            </form>
          </>
        )}
      </CardContent>

      <CardFooter className='mx-auto'>
        {session ? (
          <Button
            disabled={isAuthenticating}
            className='min-w-28'
            onClick={handleSignOut}>
            {isAuthenticating ? (
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
