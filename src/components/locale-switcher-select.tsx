"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import clsx from "clsx";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { Button } from "./ui/button";

type Props = {
  defaultValue: string;
  flag: string;
};

export default function LocaleSwitcherSelect({ defaultValue, flag }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  return (
    <div className='relative'>
      <span className='sr-only'>{flag}</span>
      <Button
        variant='outline'
        size='icon'
        className={clsx(isPending && "opacity-70 pointer-events-none")}
        disabled={isPending}
        onClick={() => {
          const nextLocale = defaultValue === "en" ? "tr" : "en";
          startTransition(() => {
            router.replace(
              // @ts-expect-error -- TypeScript will validate that only known `params`
              { pathname, params },
              { locale: nextLocale },
            );
          });
        }}>
        {flag}
      </Button>
    </div>
  );
}
