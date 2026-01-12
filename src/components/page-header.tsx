import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type PageHeaderProps = {
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
};

export function PageHeader({ title, description, children, className }: PageHeaderProps) {
  return (
    <div className={cn("mb-8 relative", className)}>
      <div>
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
            {title}
          </h1>
          {description && (
            <p className="mt-1 text-lg text-muted-foreground">{description}</p>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}
