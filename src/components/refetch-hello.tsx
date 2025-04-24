"use client";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";

export default function RefetchHello() {
  const queryClient = useQueryClient();
  return (
    <Button
      variant='outline'
      size='sm'
      className='text-xs'
      onClick={() =>
        queryClient.refetchQueries({ queryKey: ["rpcResponseSSR"] })
      }>
      Refetch SSR → CSR
    </Button>
  );
}
