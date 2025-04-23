"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { redirect } from "@/i18n/navigation";
import { signOut } from "@/lib/auth-client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createAuthClient } from "better-auth/react";
import { Loader2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardFooter } from "./ui/card";

const { useSession } = createAuthClient();

export default function UserProfile() {
  const { data: session, isPending, error } = useSession();
  const [loading, setLoading] = useState(false);
  const t = useTranslations("HomePage");
  const locale = useLocale();

  const [file, setFile] = useState<File | null>(null);

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

  const { mutate: uploadImageToCloudflareR2 } = useMutation({
    mutationFn: async () => {
      if (!file) return;
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/avatar", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      return data.url;
    },
    onSuccess: async (data) => {
      toast.success(data);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { data: avatarImage } = useQuery({
    queryKey: ["image"],
    queryFn: async () => {
      const response = await fetch(`/api/avatar`);
      const data = await response.json();
      return data.url;
    },
    enabled: !!session,
  });

  return (
    <Card className='mx-auto'>
      <CardContent className='grid place-items-center gap-2'>
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
            {session?.user?.image ? (
              <Avatar className='size-16 border-2'>
                <AvatarImage
                  src={avatarImage}
                  alt='Avatar'
                  width={150}
                  height={150}
                />
              </Avatar>
            ) : (
              <form
                className='w-24 h-24 rounded-full bg-muted flex items-center justify-center'
                onSubmit={handleSubmit}>
                <label htmlFor='file'>
                  <input
                    accept='image/*'
                    type='file'
                    name='file'
                    onChange={handleFileChange}
                  />
                  <Button>Upload</Button>
                </label>
              </form>
            )}
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
      </CardFooter>
    </Card>
  );
}
