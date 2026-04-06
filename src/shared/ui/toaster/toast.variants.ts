import { cva, type VariantProps } from 'class-variance-authority';

export const toastVariants = cva(['text-foreground px-4 py-3 rounded-lg shadow'], {
  variants: {
    variant: {
      info: 'bg-zinc-600',
      success: 'bg-green-600',
      error: 'bg-red-600',
    },
  },
  defaultVariants: {
    variant: 'info',
  },
});

export type ToastVariant = VariantProps<typeof toastVariants>;
