"use client";

import { LocaleFlag } from "@/components/locale-flag";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function LocaleToggle() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          size='icon'
          className={cn(
            isPending && "opacity-30 pointer-events-none",
            "transition-opacity duration-300 ease-in-out",
          )}
          disabled={isPending}>
          <LocaleFlag />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem
          onClick={() => {
            startTransition(() => {
              router.replace(
                // @ts-expect-error -- TypeScript will validate that only known `params`
                { pathname, params },
                { locale: "en" },
              );
            });
          }}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            startTransition(() => {
              router.replace(
                // @ts-expect-error -- TypeScript will validate that only known `params`
                { pathname, params },
                { locale: "tr" },
              );
            });
          }}>
          Türkçe
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
