import Footer from "@/components/footer";
import Navigation from "@/components/navigation";

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
      <Navigation locale={locale} />
      <main className='flex flex-col flex-1 px-4 py-3 @container/main'>
        {children}
      </main>
      <Footer locale={locale} />
    </>
  );
}
