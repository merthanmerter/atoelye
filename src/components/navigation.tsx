import LocaleToggle from "@/components/locale-toggle";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function Navigation({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "Layout" });
  return (
    <header className='flex items-center gap-2 w-full justify-between h-16 px-4 bg-card/50 border-b sticky top-0 z-10 backdrop-blur-md'>
      <Link
        href='/'
        className='flex items-center gap-2'>
        <span className='font-semibold text-xl font-sans'>{t("title")}</span>
      </Link>
      <div className='h-full flex items-center'>
        <div className='flex items-center gap-0.5'>
          <Button
            size='sm'
            variant='ghost'
            asChild>
            <Link href='/'>{t("home")}</Link>
          </Button>
          <Button
            size='sm'
            variant='ghost'
            asChild>
            <Link href='/test'>{t("test")}</Link>
          </Button>
        </div>
        <Separator
          orientation='vertical'
          className='mx-4'
        />
        <div className='flex items-center gap-2'>
          <ModeToggle />
          <LocaleToggle />
        </div>
      </div>
    </header>
  );
}
