"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { ProgressProvider } from "@bprogress/next/app";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
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
  );
};

export default Providers;
