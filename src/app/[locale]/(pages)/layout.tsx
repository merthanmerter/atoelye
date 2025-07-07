import Footer from '@/components/footer';
import Navigation from '@/components/navigation';

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <>
      <Navigation />
      <main className="container mx-auto max-w-7xl">{children}</main>
      <Footer locale={locale} />
    </>
  );
}
