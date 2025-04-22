"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { getQueryClient } from "@/lib/query-client";
import { ProgressProvider } from "@bprogress/next/app";
import { QueryClientProvider } from "@tanstack/react-query";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
        disableTransitionOnChange>
        <ProgressProvider
          height='2px'
          color='var(--primary)'
          options={{ showSpinner: false }}
          shallowRouting
          disableSameURL
          nonce='1234567890'>
          {children}
          <Toaster />
        </ProgressProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default Providers;
