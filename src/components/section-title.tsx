import type React from 'react';

interface SectionTitleProps {
  title: string;
  description?: string;
  className?: string;
  icon?: React.ReactNode;
}

export function SectionTitle({
  title,
  className = '',
  icon,
}: SectionTitleProps) {
  return (
    <div
      className={`container mx-auto border-t border-b border-solid bg-accent bg-accent/50 px-4 pt-20 pb-4 text-left [border-bottom-style:dashed] ${className}`}
    >
      <div className="flex items-center justify-between gap-2">
        {icon}
        <h2 className="my-auto font-bold text-muted-foreground text-sm uppercase leading-none">
          {title}
        </h2>
      </div>
    </div>
  );
}
