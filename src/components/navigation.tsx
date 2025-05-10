import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { NavMenu } from "./nav-menu";
import { NavUser } from "./nav-user";

export default async function Navigation({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "Layout" });
  return (
    <header className='bg-card/50 border-b sticky top-0 z-10 backdrop-blur-md'>
      <div className='@container/header max-w-7xl mx-auto w-full flex items-center gap-2 w-full h-16 px-4 gap-x-9'>
        <Link
          href='/'
          className='flex items-center gap-2'>
          <span className='font-semibold text-3xl font-sans'>{t("title")}</span>
        </Link>

        <NavMenu />
        <div className='ml-auto'>
          <NavUser />
        </div>
      </div>
    </header>
  );
}
