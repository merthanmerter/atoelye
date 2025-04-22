import { Locale, useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export default function Page({ params }: Props) {
  const { locale } = use(params);

  // Enable static rendering
  setRequestLocale(locale);

  const t = useTranslations("TestPage");

  return (
    <div className='max-w-[490px] mx-auto p-20'>
      <h1 className='text-2xl font-bold font-mono text-center mx-auto'>
        {t("title")}
      </h1>
      <div className='text-sm text-center mx-auto'>
        {t.rich("description", {
          p: (chunks) => <p className='mt-4'>{chunks}</p>,
          code: (chunks) => (
            <code className='font-mono text-white'>{chunks}</code>
          ),
        })}
      </div>
    </div>
  );
}
