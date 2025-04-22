import LocaleToggle from "@/components/locale-toggle";
import { ModeToggle } from "@/components/mode-toggle";
import Providers from "@/components/providers";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: Omit<Props, "children">) {
  const { locale } = await props.params;

  const t = await getTranslations({ locale, namespace: "HomePage" });

  return {
    title: t("title"),
    description: t("description"),
  };
}
export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Layout" });

  return (
    <>
      <html
        lang={locale}
        suppressHydrationWarning>
        <head />
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <NextIntlClientProvider>
            <Providers>
              <header className='flex items-center gap-2 w-full justify-between h-16 px-4 bg-card border-b'>
                <h1 className='font-bold font-mono'>{t("title")}</h1>
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
              {children}
              <Toaster />
            </Providers>
          </NextIntlClientProvider>
        </body>
      </html>
    </>
  );
}
