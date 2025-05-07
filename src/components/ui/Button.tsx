// src/components/ui/button.tsx
import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant = 'default', size = 'md', ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

    const variants: Record<ButtonProps['variant'], string> = {
      default: 'bg-green-600 text-white hover:bg-green-700',
      outline: 'border border-gray-300 text-gray-900 hover:bg-gray-100',
      ghost: 'bg-transparent hover:bg-gray-100 text-gray-900',
      link: 'underline text-green-600 hover:text-green-800',
    };

    const sizes: Record<ButtonProps['size'], string> = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 text-sm',
      lg: 'h-12 px-6 text-base',
    };

    return (
      <button ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...props}>
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
