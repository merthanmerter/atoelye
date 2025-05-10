"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useRouter } from "@/i18n/navigation";
import { signIn } from "@/lib/auth-client";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import NextLink from "next/link";
import { useState } from "react";
import { toast } from "sonner";
export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  return (
    <Card className='w-full border-none shadow-none bg-transparent max-w-md mx-auto'>
      <CardHeader>
        <CardTitle className='text-lg md:text-xl'>
          <span>Sign In</span>
        </CardTitle>
        <CardDescription className='text-xs md:text-sm'>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            const formData = new FormData(e.currentTarget);
            const email = formData.get("email") as string;
            const password = formData.get("password") as string;

            await signIn.email(
              {
                email,
                password,
              },
              {
                onRequest: () => {
                  setLoading(true);
                },
                onResponse: () => {
                  setLoading(false);
                },
                onSuccess: async () => {
                  queryClient.clear();
                  toast.success("Logged in successfully");
                  router.push("/");
                },
                onError: () => {
                  toast.error("Invalid email or password");
                },
              },
            );
          }}
          className='grid gap-4'>
          <div className='grid gap-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              type='email'
              name='email'
              placeholder='email@example.com'
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            />
          </div>

          <div className='grid gap-2'>
            <div className='flex items-center'>
              <Label htmlFor='password'>Password</Label>
              <NextLink
                href='/forgot-password'
                className='ml-auto inline-block text-sm underline'>
                Forgot your password?
              </NextLink>
            </div>

            <Input
              id='password'
              type='password'
              name='password'
              placeholder='password'
              autoComplete='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className='flex items-center gap-2'>
            <Checkbox
              id='remember'
              onClick={() => {
                setRememberMe(!rememberMe);
              }}
            />
            <Label htmlFor='remember'>Remember me</Label>
          </div>

          <Button
            variant='default'
            type='submit'
            className='w-full bg-blue-500 text-white hover:bg-blue-600'
            disabled={loading}>
            {loading ? (
              <Loader2
                size={16}
                className='animate-spin'
              />
            ) : (
              "LogIn"
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className='flex justify-center'>
        <Button variant='link'>
          <Link href='/register'>Don&apos;t have an account? Sign up</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
