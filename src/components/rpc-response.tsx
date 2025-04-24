"use client";

import { action as queryFn } from "@/app/[locale]/test/action";
import { useQuery } from "@tanstack/react-query";

export default function RpcResponse({
  queryKey,
  initialData,
}: {
  queryKey: [string];
  initialData?: { message: string };
}) {
  const { data, isLoading } = useQuery({
    initialData,
    queryKey,
    queryFn: () => queryFn("csr"),
  });

  return (
    <code className='font-mono block my-3 bg-foreground text-background rounded-md p-2 mx-auto max-w-xs text-xs'>
      {isLoading ? "Loading..." : JSON.stringify(data)}
    </code>
  );
}
