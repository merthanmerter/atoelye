import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import NextLink from "next/link";
import GitHubIcon from "./github-icon";
import InstagramIcon from "./instagram-icon";
import TwitterIcon from "./twitter-icon";
export default async function Footer({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "Layout" });
  return (
    <footer className='border-t border-border/30 bg-card/20 backdrop-blur-sm mt-auto'>
      <div className='max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 py-9'>
        {/* Brand Section */}
        <div className='flex flex-col'>
          <div className='flex items-center gap-2 mb-1'>
            <span className='font-semibold text-lg'>atølye</span>
          </div>
          <p className='text-sm text-muted-foreground max-w-xs mb-4'>
            {t("footerTagline")}
          </p>
          <div className='flex items-center gap-3 text-muted-foreground'>
            <NextLink
              href='https://www.instagram.com/atoelye'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-foreground transition-colors'>
              <InstagramIcon className='size-5' />
            </NextLink>
            <NextLink
              href='https://x.com/atoelye'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-foreground transition-colors'>
              <TwitterIcon className='size-5' />
            </NextLink>
            <NextLink
              href='https://github.com/atoelye'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-foreground transition-colors'>
              <GitHubIcon className='size-5' />
            </NextLink>
          </div>
        </div>

        {/* Links Section */}
        <div className='grid grid-cols-2 gap-4 md:gap-8'>
          <div>
            <h3 className='font-medium text-sm mb-3'>{t("navigation")}</h3>
            <div className='flex flex-col gap-2 text-sm text-muted-foreground'>
              <Link
                href='/'
                className='hover:text-foreground transition-colors'>
                {t("home")}
              </Link>
              <Link
                href='/test'
                className='hover:text-foreground transition-colors'>
                {t("test")}
              </Link>
            </div>
          </div>
          <div>
            <h3 className='font-medium text-sm mb-3'>{t("legal")}</h3>
            <div className='flex flex-col gap-2 text-sm text-muted-foreground'>
              <NextLink
                href='#'
                className='hover:text-foreground transition-colors'>
                {t("privacy")}
              </NextLink>
              <NextLink
                href='#'
                className='hover:text-foreground transition-colors'>
                {t("terms")}
              </NextLink>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className='ml-auto'>
          <h3 className='font-medium text-sm mb-3'>{t("newsletter")}</h3>
          <form className='relative max-w-80'>
            <input
              type='email'
              placeholder={t("emailPlaceholder")}
              className='h-9 w-full px-3 pr-24 rounded-md bg-background border border-border text-sm'
            />
            <Button
              size='sm'
              type='submit'
              variant='outline'
              className='absolute right-1 top-1 bottom-1 text-xs h-7 rounded-sm'>
              {t("subscribe")}
            </Button>
          </form>
        </div>
      </div>
    </footer>
  );
}
