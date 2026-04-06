import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { buttonVariants, type ButtonVariants } from './button.variants';
import { cn } from '../../../lib/utils/cn';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & ButtonVariants;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, fullWidth, className, children, type = 'button', ...props }, ref) => {
    return (
      <button
        type={type}
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        {...props}
      >
        <span className="min-w-0 truncate">{children}</span>
      </button>
    );
  }
);
