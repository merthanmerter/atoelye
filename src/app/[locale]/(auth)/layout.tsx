import type React from 'react';
import InalcomSvg from '@/components/inalcom-svg';
import { Link } from '@/i18n/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-dvh flex-col items-center justify-center">
      <Link className="-translate-x-1/2 absolute top-12 left-1/2 w-40" href="/">
        <InalcomSvg className="text-muted-foreground/20" />
      </Link>
      {children}
    </div>
  );
}
