import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva(
  [
    'inline-flex min-w-0 select-none items-center justify-center gap-2',
    'rounded-lg font-semibold tracking-[-0.01em] outline-none',
    'transition-[background-color,transform,box-shadow,border-color,color] duration-150',
    'disabled:pointer-events-none disabled:opacity-50',
    'focus-visible:ring-2 focus-visible:ring-primary/40',
    'focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    'shadow-(--app-shadow)',
  ],
  {
    variants: {
      variant: {
        primary:
          'border border-border bg-transparent text-primary-foreground hover:bg-muted/70 active:translate-y-px active:shadow-none active:brightness-95',
        secondary:
          'border border-border bg-surface/80 text-foreground hover:bg-muted active:translate-y-px active:shadow-none active:brightness-95',
        ghost:
          'bg-transparent text-foreground hover:bg-muted/80 active:translate-y-px active:shadow-none active:brightness-95',
        danger:
          'bg-red-600 text-white hover:bg-red-500 active:translate-y-px active:shadow-none active:inset-shadow-sm active:inset-shadow-black/20 active:brightness-95',
      },

      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-11 px-5 text-base',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
