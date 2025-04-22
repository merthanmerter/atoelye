import { useLocale, useTranslations } from "next-intl";
import LocaleSwitcherSelect from "./locale-switcher-select";

export default function LocaleToggle() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect
      defaultValue={locale}
      flag={t("flag")}
    />
  );
}
