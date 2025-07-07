'use client';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from './ui/button';

export default function RefetchHello() {
  const queryClient = useQueryClient();
  return (
    <Button
      className="text-xs"
      onClick={() =>
        queryClient.refetchQueries({ queryKey: ['rpcResponseSSR'] })
      }
      size="sm"
      variant="outline"
    >
      Refetch SSR → CSR
    </Button>
  );
}
