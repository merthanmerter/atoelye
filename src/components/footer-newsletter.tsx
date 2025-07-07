'use client';
import { useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { rpc } from '@/lib/rpc';
import { Button } from './ui/button';

export default function FooterNewsletter() {
  const t = useTranslations('Layout');
  const subscribe = useMutation({
    mutationFn: async (email: string) => {
      const res = await rpc.api.newsletter.$post({
        form: {
          email,
        },
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message);
      }

      return json;
    },
    onSuccess: (res) => {
      toast.success(res.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <div>
      <h3 className="mb-3 font-medium text-sm">{t('newsletter')}</h3>
      <form
        className="relative max-w-80"
        onSubmit={(e) => {
          e.preventDefault();
          const email = new FormData(e.currentTarget).get('email') as string;
          if (!email) {
            return;
          }
          subscribe.mutate(email);
        }}
      >
        <input
          className="h-9 w-full rounded-md border border-border bg-background px-3 pr-24 text-sm"
          disabled={subscribe.isPending}
          name="email"
          placeholder={t('emailPlaceholder')}
          type="email"
        />
        <Button
          className="absolute top-1 right-1 bottom-1 h-7 w-20 rounded-sm text-xs"
          disabled={subscribe.isPending}
          size="sm"
          type="submit"
          variant="outline"
        >
          {subscribe.isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            t('subscribe')
          )}
        </Button>
      </form>
    </div>
  );
}
