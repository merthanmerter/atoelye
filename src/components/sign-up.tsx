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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@/i18n/navigation";
import { signUp } from "@/lib/auth-client";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignUp = useMutation({
    mutationFn: async () => {
      await signUp.email({
        email,
        password,
        name: `${firstName} ${lastName}`,
        // image: imageUrl ?? undefined,
        callbackURL: "/",
        fetchOptions: {
          onResponse: () => {
            setLoading(false);
          },
          onRequest: () => {
            setLoading(true);
          },
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
          onSuccess: async () => {
            router.push("/");
          },
        },
      });
    },
  });

  return (
    <Card className='w-full max-w-md'>
      <CardHeader>
        <CardTitle className='text-lg md:text-xl'>Sign Up</CardTitle>
        <CardDescription className='text-xs md:text-sm'>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid gap-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='first-name'>First name</Label>
              <Input
                id='first-name'
                placeholder='Max'
                required
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                value={firstName}
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='last-name'>Last name</Label>
              <Input
                id='last-name'
                placeholder='Robinson'
                required
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                value={lastName}
              />
            </div>
          </div>
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
            <Label htmlFor='password'>Password</Label>
            <Input
              id='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete='new-password'
              placeholder='Password'
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='password'>Confirm Password</Label>
            <Input
              id='password_confirmation'
              type='password'
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              autoComplete='new-password'
              placeholder='Confirm Password'
            />
          </div>

          <Button
            type='submit'
            className='w-full'
            disabled={loading}
            onClick={async () => {
              handleSignUp.mutate();
            }}>
            {loading ? (
              <Loader2
                size={16}
                className='animate-spin'
              />
            ) : (
              "Create an account"
            )}
          </Button>
        </div>
      </CardContent>
      <CardFooter className='flex justify-center'>
        <Button variant='link'>
          <Link href='/login'>Already have an account? Sign in</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
