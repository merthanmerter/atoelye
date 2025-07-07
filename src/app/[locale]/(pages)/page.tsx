import {
  ArrowRightIcon,
  CheckCircleIcon,
  DownloadIcon,
  GlobeIcon,
  GraduationCapIcon,
  HammerIcon,
  HandshakeIcon,
  LightbulbIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  SendIcon,
  SettingsIcon,
  TrendingUpIcon,
  WrenchIcon,
} from 'lucide-react';
import Image from 'next/image';
import NextLink from 'next/link';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import GridMotion from '@/components/bg-grid-motion';
import Waves from '@/components/bg-waves';
import { SectionTitle } from '@/components/section-title';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const t = await getTranslations('HomePage');
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      {/* Hero Section */}
      <div className="relative border-r border-l">
        <div className="absolute inset-0">
          <Waves
            className="dark:invert"
            lineColor="#e2e2e2"
            waveSpeedX={0.1}
            waveSpeedY={0.1}
          />
        </div>
        <div className="relative flex flex-col items-center px-4 py-48">
          <Button
            asChild
            className="mb-3 rounded-full font-medium text-sm"
            size="sm"
            variant="outline"
          >
            <NextLink href="#services">
              <ArrowRightIcon className="ml-1 h-3.5 w-3.5" />
              {t('exploreServices')}
            </NextLink>
          </Button>

          <h1 className="mb-3 text-center font-bold text-4xl md:text-5xl lg:text-6xl">
            {t('title')}
          </h1>

          <p className="mb-6 text-center text-muted-foreground md:text-xl lg:mt-6">
            {t('description')}
          </p>

          <div className="flex w-full flex-col gap-2 md:flex-row md:justify-center">
            <Button asChild className="min-w-28" size="lg">
              <Link href="/login">{t('signIn')}</Link>
            </Button>
            <Button
              asChild
              className="hidden md:inline-flex"
              size="lg"
              variant="outline"
            >
              <NextLink href="#contact-us">{t('contactUs')}</NextLink>
            </Button>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div className="border-r border-l">
        <SectionTitle
          icon={<GlobeIcon className="size-5 text-muted-foreground" />}
          title={'Inalcom'}
        />
        {/* Stats Chart Section */}
        <div className="relative">
          {/* Background with curve */}
          <div className="relative overflow-hidden p-6 md:p-16 lg:p-32">
            {/* Dashed grid lines */}
            <div className="absolute inset-0 h-full w-full">
              <div className="grid h-full w-full grid-cols-4 md:grid-cols-8 lg:grid-cols-12">
                {Array.from({ length: 12 }, (_, index) => `grid-${index}`).map(
                  (lineId) => (
                    <div className="relative" key={lineId}>
                      <div className="absolute inset-y-0 right-0 w-px border-border/30 border-r border-dashed" />
                    </div>
                  )
                )}
              </div>
              <div className="absolute inset-0 grid h-full w-full grid-rows-4 md:grid-rows-6">
                {Array.from({ length: 6 }, (_, index) => `row-${index}`).map(
                  (lineId) => (
                    <div className="relative" key={lineId}>
                      <div className="absolute inset-x-0 bottom-0 h-px border-border/30 border-b border-dashed" />
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Background curve SVG */}
            <svg
              className="absolute inset-0 h-full w-full"
              preserveAspectRatio="none"
              viewBox="0 0 1400 600"
            >
              <title>Productivity Growth Background</title>
              <defs>
                <linearGradient id="bgGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 500 C400 450 800 300 1200 100 Q1300 50 1400 0 V600 H0 Z"
                fill="url(#bgGradient)"
              />
            </svg>

            {/* Growth curve line - Performance style */}
            <svg
              className="absolute inset-0 h-full w-full opacity-20"
              preserveAspectRatio="none"
              viewBox="0 0 1400 600"
            >
              <title>Growth Curve</title>
              <path
                d="M0 500 C400 450 800 300 1200 100 Q1300 50 1400 0"
                fill="none"
                stroke="#3b82f6"
                strokeLinecap="round"
                strokeWidth="2"
              />
            </svg>

            {/* Content overlay */}
            <div className="container relative mx-auto flex h-full min-h-[400px] flex-col justify-center px-4">
              {/* Title section */}
              <div className="mb-6 max-w-4xl md:mb-8">
                <h2 className="mb-3 font-bold text-lg md:mb-4 md:text-xl lg:text-2xl">
                  <span className="text-foreground">{t('chart.title')}</span>
                  <span className="ml-1.5 font-medium text-muted-foreground">
                    {t('chart.subtitle')}
                  </span>
                </h2>
              </div>

              {/* About Points */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
                <div className="flex flex-col">
                  <div className="relative border-foreground border-l-2 pl-3 md:pl-4">
                    <p className="font-medium text-sm md:text-base lg:text-base">
                      {t('aboutUs.point1')}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="relative border-foreground border-l-2 pl-3 md:pl-4">
                    <p className="font-medium text-sm md:text-base lg:text-base">
                      {t('aboutUs.point2')}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="relative border-foreground border-l-2 pl-3 md:pl-4">
                    <p className="font-medium text-sm md:text-base lg:text-base">
                      {t('aboutUs.point3')}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="relative border-foreground border-l-2 pl-3 md:pl-4">
                    <p className="font-medium text-sm md:text-base lg:text-base">
                      {t('aboutUs.point4')}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="relative border-foreground border-l-2 pl-3 md:pl-4">
                    <p className="font-medium text-sm md:text-base lg:text-base">
                      {t('aboutUs.point5')}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="relative border-foreground border-l-2 pl-3 md:pl-4">
                    <p className="font-medium text-sm md:text-base lg:text-base">
                      {t('aboutUs.point6')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="border-r border-l" id="services">
        <SectionTitle
          icon={<WrenchIcon className="size-5 text-muted-foreground" />}
          title={t('services.title')}
        />
        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3">
          {/* Training - Row 1 on all screens, needs right border on md+, bottom border on all */}
          <div className="container mx-auto border-b px-4 py-8 hover:bg-muted/50 md:border-r">
            <div className="mb-4">
              <div className="mb-3 flex items-center gap-3">
                <GraduationCapIcon className="size-5 text-muted-foreground" />
                <h3 className="font-semibold text-muted-foreground">
                  {t('services.categories.0.title')}
                </h3>
              </div>
            </div>
            <p className="text-muted-foreground text-sm">
              {t('services.categories.0.description')}
            </p>
          </div>

          {/* Improve KPI - Row 1 on md/lg, needs right border on lg, bottom border on all */}
          <div className="container mx-auto border-b px-4 py-8 hover:bg-muted/50 lg:border-r">
            <div className="mb-4">
              <div className="mb-3 flex items-center gap-3">
                <TrendingUpIcon className="size-5 text-muted-foreground" />
                <h3 className="font-semibold text-muted-foreground">
                  {t('services.categories.1.title')}
                </h3>
              </div>
            </div>
            <p className="text-muted-foreground text-sm">
              {t('services.categories.1.description')}
            </p>
          </div>

          {/* TPM, Toyota Tools - Right column on md, needs right border on md, bottom border on mobile/md only */}
          <div className="container mx-auto border-b px-4 py-8 hover:bg-muted/50 md:border-r lg:border-r-0">
            <div className="mb-4">
              <div className="mb-3 flex items-center gap-3">
                <SettingsIcon className="size-5 text-muted-foreground" />
                <h3 className="font-semibold text-muted-foreground">
                  {t('services.categories.2.title')}
                </h3>
              </div>
            </div>
            <p className="text-muted-foreground text-sm">
              {t('services.categories.2.description')}
            </p>
          </div>

          {/* Die Shop - Row 2 on md, row 2 col 1 on lg, needs right border on lg, bottom border on mobile/md only */}
          <div className="container mx-auto border-b px-4 py-8 hover:bg-muted/50 lg:border-r lg:border-b-0">
            <div className="mb-4">
              <div className="mb-3 flex items-center gap-3">
                <HammerIcon className="size-5 text-muted-foreground" />
                <h3 className="font-semibold text-muted-foreground">
                  {t('services.categories.3.title')}
                </h3>
              </div>
            </div>
            <p className="text-muted-foreground text-sm">
              {t('services.categories.3.description')}
            </p>
          </div>

          {/* Maintenance - Row 3 col 1 on md, row 2 col 2 on lg, needs right border on md/lg, no bottom border on md/lg */}
          <div className="container mx-auto border-b px-4 py-8 hover:bg-muted/50 md:border-r lg:border-r lg:border-b-0">
            <div className="mb-4">
              <div className="mb-3 flex items-center gap-3">
                <WrenchIcon className="size-5 text-muted-foreground" />
                <h3 className="font-semibold text-muted-foreground">
                  {t('services.categories.4.title')}
                </h3>
              </div>
            </div>
            <p className="text-muted-foreground text-sm">
              {t('services.categories.4.description')}
            </p>
          </div>

          {/* Develop Products - Last item, no borders on md/lg */}
          <div className="container mx-auto px-4 py-8 hover:bg-muted/50">
            <div className="mb-4">
              <div className="mb-3 flex items-center gap-3">
                <LightbulbIcon className="size-5 text-muted-foreground" />
                <h3 className="font-semibold text-muted-foreground">
                  {t('services.categories.5.title')}
                </h3>
              </div>
            </div>
            <p className="text-muted-foreground text-sm">
              {t('services.categories.5.description')}
            </p>
          </div>
        </div>

        <SectionTitle
          icon={<WrenchIcon className="size-5 text-muted-foreground" />}
          title={t('products.title')}
        />
        {/* Optical Measuring Solutions Section */}
        <div className="relative">
          {/* GridMotion Background */}
          <div className="absolute inset-0 h-full w-full opacity-30 contrast-125 grayscale dark:invert">
            <GridMotion
              gradientColor="hsl(var(--background))"
              items={['/pixera-1.png', '/pixera-2.png']}
            />
          </div>

          {/* Content */}
          <div className="container relative mx-auto px-4 py-16 text-center">
            <div className="mx-auto max-w-2xl rounded-lg border bg-background/50 p-8 backdrop-blur-lg">
              <h2 className="mb-4 font-bold text-3xl lg:text-4xl">
                {t('solutions.title')}
              </h2>
              <p className="mb-12 text-muted-foreground lg:text-lg">
                {t('solutions.description')}
              </p>

              <div className="grid gap-6 text-left md:grid-cols-2">
                {t.raw('solutions.capabilities').map((capability: string) => (
                  <div className="flex items-start gap-3" key={capability}>
                    <CheckCircleIcon className="mt-0.5 size-5 text-primary" />
                    <p className="font-medium">{capability}</p>
                  </div>
                ))}
              </div>
              <Button asChild className="mt-8" size="lg">
                <a
                  href="/pixera-en.pdf"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <DownloadIcon className="mr-2 size-4" />
                  Download Brochure
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Inquiry Section */}
      <div className="border-r border-l" id="contact-us">
        <SectionTitle
          icon={<SendIcon className="size-5 text-muted-foreground" />}
          title={t('contactUs')}
        />

        {/* Contact Grid */}
        <div className="grid lg:grid-cols-2">
          {/* Contact Information */}
          <div className="container mx-auto border-b px-4 py-8 lg:border-r lg:border-b-0">
            <div className="space-y-8">
              <div>
                <h3 className="mb-4 font-semibold text-lg">
                  {t('contact.getInTouch')}
                </h3>
                <p className="mb-6 text-muted-foreground text-sm">
                  {t('contact.contactUsDescription')}
                </p>
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <MapPinIcon className="mt-1 size-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Address</p>
                      <div className="text-muted-foreground text-sm">
                        <p>APDO 510 43800 VALLS (TARRAGONA) SPAIN</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <PhoneIcon className="mt-1 size-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-muted-foreground text-sm">
                        +34670098209
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MailIcon className="mt-1 size-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Email</p>
                      <div className="text-muted-foreground text-sm">
                        <p>sales.inalco@gmail.com</p>
                        <p>extrusionsim@gmail.com</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <GlobeIcon className="mt-1 size-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Website</p>

                      <a
                        className="block text-primary text-sm hover:underline"
                        href="https://www.inalcocompany.com"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        inalcocompany.com
                      </a>
                      <a
                        className="block text-primary text-sm hover:underline"
                        href="https://www.extrusionsim.com"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        extrusionsim.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border bg-primary/5 p-6">
                <h4 className="mb-3 font-semibold text-base">Quick Response</h4>
                <p className="mb-4 text-muted-foreground text-sm">
                  We typically respond to all inquiries within 24 hours. For
                  urgent matters, please call us directly.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="container mx-auto px-4 py-8">
            <div className="space-y-6">
              <h3 className="font-semibold text-lg">Send us a Message</h3>
              <form className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      className="mb-1 block font-medium text-sm"
                      htmlFor="firstName"
                    >
                      First Name
                    </label>
                    <input
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      id="firstName"
                      placeholder="John"
                      type="text"
                    />
                  </div>
                  <div>
                    <label
                      className="mb-1 block font-medium text-sm"
                      htmlFor="lastName"
                    >
                      Last Name
                    </label>
                    <input
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      id="lastName"
                      placeholder="Doe"
                      type="text"
                    />
                  </div>
                </div>
                <div>
                  <label
                    className="mb-1 block font-medium text-sm"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    id="email"
                    placeholder="john@example.com"
                    type="email"
                  />
                </div>
                <div>
                  <label
                    className="mb-1 block font-medium text-sm"
                    htmlFor="company"
                  >
                    Company
                  </label>
                  <input
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    id="company"
                    placeholder="Your Company"
                    type="text"
                  />
                </div>
                <div>
                  <label
                    className="mb-1 block font-medium text-sm"
                    htmlFor="service"
                  >
                    Service of Interest
                  </label>
                  <select
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    id="service"
                  >
                    <option value="">Select a service</option>
                    <option value="training">Training & Consulting</option>
                    <option value="kpi">KPI Improvement</option>
                    <option value="tpm">TPM & Toyota Tools</option>
                    <option value="die-shop">Die Shop Solutions</option>
                    <option value="maintenance">Maintenance Solutions</option>
                    <option value="product-dev">Product Development</option>
                  </select>
                </div>
                <div>
                  <label
                    className="mb-1 block font-medium text-sm"
                    htmlFor="message"
                  >
                    Message
                  </label>
                  <textarea
                    className="min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    id="message"
                    placeholder="Tell us about your project or requirements..."
                  />
                </div>
                <Button className="w-full" type="submit">
                  Send Message
                  <ArrowRightIcon className="ml-2 size-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Location Section */}
      <div className="border-r border-l">
        <div className="border-t">
          <div className="aspect-[21/9] w-full">
            <iframe
              allowFullScreen
              className="brightness-105 grayscale"
              height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              // style={{ border: 0, filter: 'grayscale(1)' }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2987.123456789!2d1.2529!3d41.2858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z0JLQsNC70LvRgQ!5e0!3m2!1sen!2ses!4v1234567890123!5m2!1sen!2ses"
              title="Our Location in Valls, Tarragona, Spain"
              width="100%"
            />
          </div>
        </div>
      </div>

      {/* Partners Section */}
      <section className="border-r border-l">
        <SectionTitle
          icon={<HandshakeIcon className="size-5 text-muted-foreground" />}
          title={t('partners.title')}
        />
        <div className="grid grid-cols-2 md:grid-cols-6">
          {t
            .raw('partners.companies')
            .map(
              (company: {
                name: string;
                logo: string;
                description: string;
                url?: string;
              }) => {
                const content = (
                  <div
                    className={'group container mx-auto px-4 py-8'}
                    title={`${company.name} - ${company.description}`}
                  >
                    <div className="flex h-16 items-center justify-center">
                      <Image
                        alt={`${company.name} logo`}
                        className="max-h-12 max-w-full object-contain opacity-50 mix-blend-multiply grayscale transition-all duration-300 group-hover:opacity-100 dark:mix-blend-screen dark:invert"
                        height={200}
                        src={`/${company.logo}`}
                        width={200}
                      />
                    </div>
                  </div>
                );

                if (company.url) {
                  return (
                    <a
                      href={company.url}
                      key={company.name}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {content}
                    </a>
                  );
                }

                return <div key={company.name}>{content}</div>;
              }
            )}
        </div>
      </section>
    </>
  );
}
