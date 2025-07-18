'use client';
import { useMutation } from '@tanstack/react-query';
import { Loader2, MailIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useSession } from '@/lib/auth-client';
import { rpc } from '@/lib/rpc';
import { Button } from './ui/button';

export default function SendTestEmail() {
  const { data: session } = useSession();
  const send = useMutation({
    mutationFn: async () => {
      if (!session) {
        return null;
      }
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
      className="text-xs"
      disabled={send.isPending}
      onClick={() => send.mutate()}
      size="sm"
      variant="outline"
    >
      {send.isPending ? (
        <Loader2 className="mr-1 size-4 animate-spin" />
      ) : (
        <MailIcon className="mr-1 size-4" />
      )}
      Send Test Email
    </Button>
  );
}
