import NextLink from 'next/link';
import { getTranslations } from 'next-intl/server';
import FooterNewsletter from './footer-newsletter';
import GoogleIcon from './google-icon';
import LinkedinIcon from './linkedin-icon';
import TwitterIcon from './twitter-icon';

export default async function Footer({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'Layout' });
  return (
    <footer className="mt-auto border-t">
      <div className="@container/footer mx-auto max-w-7xl px-4 py-16">
        <div className="flex flex-col">
          {/* Footnotes - Top on desktop, bottom on mobile */}
          <ul className="order-2 flex flex-col gap-3 pt-16 text-xs md:order-1 md:pt-0 md:pb-16">
            <li className="inline-block">
              <sup className="pr-1">1</sup>
              <div className="inline">{t('footnote1')}</div>
            </li>
            <li className="inline-block">
              <sup className="pr-1">2</sup>
              <div className="inline">{t('footnote2')}</div>
            </li>
            <li className="inline-block">
              <sup className="pr-1">3</sup>
              <div className="inline">{t('footnote3')}</div>
            </li>
          </ul>

          {/* Main content grid */}
          <div className="order-1 grid grid-cols-1 gap-8 md:order-2 md:grid-cols-2">
            {/* Newsletter Section - First on mobile */}
            <div className="flex justify-center md:order-3 md:ml-auto md:justify-start">
              <FooterNewsletter />
            </div>

            {/* Brand Section - Last on mobile */}
            <div className="flex flex-col items-center md:order-1 md:items-start">
              <div className="mb-1 flex items-center gap-2">
                <span className="font-semibold text-lg">inalcom</span>
              </div>
              <p className="mb-4 max-w-xs text-center text-muted-foreground text-sm md:text-left">
                {t('footerTagline')}
              </p>
              <div className="flex items-center gap-3 text-muted-foreground">
                <NextLink href="#">
                  <LinkedinIcon className="size-5" />
                </NextLink>
                <NextLink href="#">
                  <TwitterIcon className="size-5" />
                </NextLink>
                <NextLink href="#">
                  <GoogleIcon className="size-5" />
                </NextLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
