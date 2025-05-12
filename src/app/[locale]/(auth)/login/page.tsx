import SignIn from "@/components/sign-in";

export const dynamic = "force-static";

export default async function Login() {
  return (
    <div className='w-full h-full flex flex-col justify-center items-center bg-border/20'>
      <h1 className='text-muted-foreground/20 font-bold text-5xl absolute top-12 inset-x-0 text-center select-none'>
        atølye
      </h1>
      <SignIn />
    </div>
  );
}
