import SignIn from "@/components/sign-in";
import { getTranslations } from "next-intl/server";

export default async function Login() {
  const t = await getTranslations("HomePage");
  console.log(t("signIn"));
  return <SignIn />;
}
