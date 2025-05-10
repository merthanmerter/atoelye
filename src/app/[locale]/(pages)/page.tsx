import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const t = await getTranslations("HomePage");
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className='border-l border-r border-b [border-bottom-style:dashed]'>
      <div className='flex flex-col items-center relative pt-9 lg:pt-36 lg:pb-20'>
        <div className='relative'>
          <Button
            variant='outline'
            size='sm'
            className='text-sm font-medium rounded-r-full rounded-l-full'>
            <span>Explore our products</span>
            <ArrowRight className='w-3.5 h-3.5 ml-1' />
          </Button>
        </div>

        <h1 className='mt-3 text-center text-4xl font-bold md:text-5xl lg:text-6xl xl:text-7xl'>
          Craftsmanship <br />
          evolved.
        </h1>

        <p className='mt-3 max-w-[460px] text-center text-lg text-muted-foreground md:text-xl lg:mt-6'>
          Atølye turns your ideas into reality—combining timeless craftsmanship
          with modern tools.
        </p>

        <div className='flex flex-col items-stretch md:flex-row md:justify-center mt-6 w-full gap-2'>
          <Button
            size='lg'
            className='min-w-28'
            asChild>
            <Link href='/login'>{t("signIn")}</Link>
          </Button>

          <Button
            variant='outline'
            size='lg'
            className='hidden md:inline-flex'>
            Contact us
          </Button>
        </div>
      </div>
    </div>
  );
}
