"use client";
import { useSession } from "@/lib/auth-client";
import { getRpcClient } from "@/lib/rpc";
import { useMutation } from "@tanstack/react-query";
import { Loader2, MailIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";

export default function SendTestEmail() {
  const { data: session } = useSession();
  const send = useMutation({
    mutationFn: async () => {
      if (!session) return null;
      const rpc = await getRpcClient();
      const res = await rpc.api.send.$post({
        json: {
          email: session.user.email,
          name: session.user.name,
        },
      });
      return await res.json();
    },
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
      variant='outline'
      className='text-xs'
      onClick={() => send.mutate()}>
      {send.isPending ? (
        <Loader2 className='size-4 animate-spin mr-1' />
      ) : (
        <MailIcon className='size-4 mr-1' />
      )}
      Send Test Email
    </Button>
  );
}
