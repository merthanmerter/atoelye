"use client";

import {
  BadgeCheck,
  Bell,
  CreditCard,
  GlobeIcon,
  LogOut,
  MonitorIcon,
  MoonIcon,
  SunIcon,
  UserRound,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { signOut, useSession } from "@/lib/auth-client";
import { rpc } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { Button } from "./ui/button";

export function NavUser() {
  const { data: session } = useSession();

  const { data: avatarData } = useQuery({
    queryKey: ["avatar"],
    queryFn: async ({ signal }) => {
      if (!session || !session.user.image) {
        return null;
      }
      const res = await rpc.api.avatar.$get({ signal });
      if (res.ok) return await res.json();
      return null;
    },
    enabled: !!session?.user.image,
  });

  const { theme, setTheme } = useTheme();

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();
  const t = useTranslations("HomePage");

  if (!session) {
    return (
      <Button variant='outline'>
        <Link href='/login'>{t("signIn")}</Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          disabled={isPending}
          variant='ghost'
          className='size-8 rounded-full'>
          <Avatar className='size-8'>
            <>
              <AvatarImage
                src={avatarData?.url}
                alt={session?.user.name}
              />
              <AvatarFallback>
                <UserRound className='size-4' />
              </AvatarFallback>
            </>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
        align='end'
        sideOffset={4}>
        <DropdownMenuLabel className='p-0 font-normal'>
          <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
            <Avatar className='size-8'>
              <AvatarImage
                src={avatarData?.url}
                alt={session?.user.name}
              />
              <AvatarFallback>
                <UserRound className='size-4' />
              </AvatarFallback>
            </Avatar>

            <div className='grid flex-1 text-left text-sm leading-tight'>
              <span className='truncate font-semibold'>
                {session?.user.name}
              </span>
              <span className='truncate text-xs'>{session?.user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className='gap-2'>
              <GlobeIcon className='size-4 text-muted-foreground' />
              Language
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuCheckboxItem
                  checked={params.locale === "en"}
                  onCheckedChange={() => {
                    startTransition(() => {
                      router.replace(
                        // @ts-expect-error -- TypeScript will validate that only known `params`
                        { pathname, params },
                        { locale: "en" },
                      );
                    });
                  }}>
                  English
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={params.locale === "tr"}
                  onCheckedChange={() => {
                    startTransition(() => {
                      router.replace(
                        // @ts-expect-error -- TypeScript will validate that only known `params`
                        { pathname, params },
                        { locale: "tr" },
                      );
                    });
                  }}>
                  Türkçe
                </DropdownMenuCheckboxItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className='gap-2'>
              {theme === "dark" ? (
                <MoonIcon className='size-4 text-muted-foreground' />
              ) : theme === "light" ? (
                <SunIcon className='size-4 text-muted-foreground' />
              ) : (
                <MonitorIcon className='size-4 text-muted-foreground' />
              )}
              Theme
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuCheckboxItem
                  checked={theme === "light"}
                  onCheckedChange={() => setTheme("light")}>
                  Light
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={theme === "dark"}
                  onCheckedChange={() =>
                    setTheme(theme === "dark" ? "light" : "dark")
                  }>
                  Dark
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={theme === "system"}
                  onCheckedChange={() => setTheme("system")}>
                  System
                </DropdownMenuCheckboxItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href='/account'>
              <BadgeCheck />
              Account
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard />
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Bell />
            Notifications
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            await signOut({
              fetchOptions: {
                credentials: "include",
              },
            });
          }}>
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
