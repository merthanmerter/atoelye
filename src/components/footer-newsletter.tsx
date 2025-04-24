"use client";
import { getRpcClient } from "@/lib/rpc";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Button } from "./ui/button";

export default function FooterNewsletter() {
  const t = useTranslations("Layout");
  const subscribe = useMutation({
    mutationFn: async (email: string) => {
      const rpc = await getRpcClient();
      const res = await rpc.api.newsletter.$post({
        form: {
          email,
        },
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message);
      }

      return json;
    },
    onSuccess: (res) => {
      toast.success(res.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <div className='md:ml-auto'>
      <h3 className='font-medium text-sm mb-3'>{t("newsletter")}</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const email = new FormData(e.currentTarget).get("email") as string;
          if (!email) return;
          subscribe.mutate(email);
        }}
        className='relative max-w-80'>
        <input
          disabled={subscribe.isPending}
          type='email'
          name='email'
          placeholder={t("emailPlaceholder")}
          className='h-9 w-full px-3 pr-24 rounded-md bg-background border border-border text-sm'
        />
        <Button
          disabled={subscribe.isPending}
          size='sm'
          type='submit'
          variant='outline'
          className='absolute right-1 top-1 bottom-1 text-xs h-7 rounded-sm w-20'>
          {subscribe.isPending ? (
            <Loader2 className='size-4 animate-spin' />
          ) : (
            t("subscribe")
          )}
        </Button>
      </form>
    </div>
  );
}
