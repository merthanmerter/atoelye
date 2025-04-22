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
import { signIn } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  return (
    <div className='p-20 grid place-items-center'>
      <Card className='max-w-md w-full'>
        <CardHeader>
          <CardTitle className='text-lg md:text-xl'>Sign In</CardTitle>
          <CardDescription className='text-xs md:text-sm'>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='m@example.com'
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
                <Link
                  href='#'
                  className='ml-auto inline-block text-sm underline'>
                  Forgot your password?
                </Link>
              </div>

              <Input
                id='password'
                type='password'
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
              type='submit'
              className='w-full'
              disabled={loading}
              onClick={async () => {
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
                      toast.success("Logged in successfully");
                      router.push("/");
                    },
                    onError: () => {
                      toast.error("Invalid email or password");
                    },
                  },
                );
              }}>
              {loading ? (
                <Loader2
                  size={16}
                  className='animate-spin'
                />
              ) : (
                "LogIn"
              )}
            </Button>
          </div>
        </CardContent>
        <CardFooter className='flex justify-center'>
          <Button variant='link'>
            <Link href='/register'>Don&apos;t have an account? Sign up</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
