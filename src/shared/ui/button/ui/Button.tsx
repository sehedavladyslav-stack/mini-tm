import { type ButtonHTMLAttributes } from 'react';
import { cn } from '../../../lib/utils/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  type = 'button',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn('ui-btn', `ui-btn--${variant}`, `ui-btn--${size}`, className)}
      disabled={disabled}
      {...props}
    >
      <span className="ui-btn__text"> {children}</span>
    </button>
  );
}
