"use client";
import { getUserById } from "@/server/proxy/get-user-by-id";
import { useMutation, useQuery } from "@tanstack/react-query";
import { User } from "better-auth";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";

const sendEmail = async (user: Partial<User>) => {
  const response = await fetch("/api/send", {
    method: "POST",
    body: JSON.stringify({
      name: user.name,
      email: user.email,
    }),
  });
  return await response.json();
};

export default function TestPage({ user }: { user: User | undefined }) {
  const { data, isFetching, isRefetching, error, refetch } = useQuery({
    queryKey: ["user", user?.id],
    queryFn: () => getUserById(user?.id),
    enabled: !!user?.id,
  });

  const send = useMutation({
    mutationFn: (user: User) =>
      sendEmail({
        email: user.email,
        name: user.name,
      }),
    onSuccess: (data) => {
      toast.success(JSON.stringify(data));
    },
    onError: (error) => {
      toast.error(JSON.stringify(error));
    },
  });

  const isLoading = isFetching || isRefetching;

  if (!user) {
    return (
      <div className='bg-foreground text-background p-3 rounded-md my-2 font-mono text-xs whitespace-pre-line text-ellipsis overflow-hidden break-words'>
        No user
      </div>
    );
  }

  return (
    <div className='bg-foreground text-background p-3 rounded-md my-2 font-mono text-xs whitespace-pre-line text-ellipsis overflow-hidden break-words'>
      <p>Client side fetch:</p>
      {error
        ? (error?.message ?? "Error")
        : isLoading
          ? "Loading..."
          : JSON.stringify(
              data
                ? Object.fromEntries(
                    Object.entries(data).filter(([key]) => key !== "image"),
                  )
                : {},
              null,
              2,
            )}
      <div className='flex gap-2 justify-center items-center mt-4'>
        <Button
          size='sm'
          className='text-xs'
          disabled={isLoading}
          onClick={() => refetch()}>
          {isLoading ? (
            <Loader2 className='size-4 animate-spin mx-auto text-muted-foreground' />
          ) : (
            "Mutate"
          )}
        </Button>
        <Button
          disabled={isLoading || send.isPending}
          size='sm'
          className='text-xs'
          onClick={() => send.mutate(user)}>
          {send.isPending ? (
            <Loader2 className='size-4 animate-spin mx-auto text-muted-foreground' />
          ) : (
            "Send Test Email"
          )}
        </Button>
      </div>
    </div>
  );
}
