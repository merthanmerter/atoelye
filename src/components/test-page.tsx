"use client";
import { useSession } from "@/lib/auth-client";
import { useMutation } from "@tanstack/react-query";
import { User } from "better-auth";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";

const sendEmail = async (user: Partial<User>) => {
  if (!user) return;
  const response = await fetch("/api/send", {
    method: "POST",
    body: JSON.stringify({
      name: user.name,
      email: user.email,
    }),
  });
  return await response.json();
};

export default function TestPage() {
  const { data: session } = useSession();
  const send = useMutation({
    mutationFn: () =>
      sendEmail({
        email: session?.user.email,
        name: session?.user.email,
      }),
    onSuccess: (data) => {
      toast.success(JSON.stringify(data));
    },
    onError: (error) => {
      toast.error(JSON.stringify(error));
    },
  });

  return (
    <Button
      disabled={send.isPending}
      size='sm'
      className='text-xs'
      onClick={() => send.mutate()}>
      {send.isPending ? (
        <Loader2 className='size-4 animate-spin mx-auto text-muted-foreground' />
      ) : (
        "Send Test Email"
      )}
    </Button>
  );
}
