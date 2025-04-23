import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import NextLink from "next/link";
import FooterNewsletter from "./footer-newsletter";
import GitHubIcon from "./github-icon";
import InstagramIcon from "./instagram-icon";
import TwitterIcon from "./twitter-icon";
export default async function Footer({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "Layout" });
  return (
    <footer className='border-t border-border/30 bg-border/20 backdrop-blur-sm mt-auto'>
      <div className='max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 py-9'>
        {/* Newsletter Section - First on mobile */}
        <div className='md:order-3 flex justify-center md:justify-start'>
          <FooterNewsletter />
        </div>

        {/* Links Section */}
        <div className='grid grid-cols-2 gap-4 md:gap-8 md:order-2 mx-auto md:mx-0'>
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

        {/* Brand Section - Last on mobile */}
        <div className='flex flex-col md:order-1 items-center md:items-start'>
          <div className='flex items-center gap-2 mb-1'>
            <span className='font-semibold text-lg'>atølye</span>
          </div>
          <p className='text-sm text-muted-foreground max-w-xs mb-4 text-center md:text-left'>
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
      </div>
    </footer>
  );
}
