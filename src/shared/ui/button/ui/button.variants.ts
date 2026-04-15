import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva(
  [
    'inline-flex min-w-0 select-none items-center justify-center gap-2',
    'rounded-lg font-semibold tracking-[-0.01em] outline-none',
    'transition-[background-color,transform,box-shadow,border-color,color] duration-150',
    'disabled:pointer-events-none disabled:opacity-50',
    'focus-visible:ring-2 focus-visible:ring-focus-ring/40',
    'focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    'shadow-sm',
  ],
  {
    variants: {
      variant: {
        primary: [
          'border border-border',
          'bg-primary text-primary-foreground',
          'hover:bg-primary-hover',
          'active:bg-primary-active',
          'active:translate-y-px active:shadow-none',
        ],

        secondary: [
          'border border-border',
          'bg-secondary text-secondary-foreground',
          'hover:bg-secondary-hover',
          'active:bg-secondary-active',
          'active:translate-y-px active:shadow-none',
        ],

        ghost: [
          'bg-transparent text-foreground',
          'hover:bg-surface-2',
          'active:bg-surface-3',
          'active:translate-y-px active:shadow-none',
        ],

        danger: [
          'border border-border',
          'bg-danger text-danger-foreground',
          'hover:bg-danger/90',
          'active:bg-danger/80',
          'active:translate-y-px active:shadow-none',
        ],
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
