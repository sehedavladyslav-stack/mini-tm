// import type { Config } from 'tailwindcss';

// export default {
//   darkMode: ['class', '[data-theme="dark"]'],

//   content: ['./index.html', './src/**/*.{ts,tsx}'],

//   theme: {
//     extend: {
//       colors: {
//         background: 'var(--color-background)',
//         foreground: 'var(--color-foreground)',
//         surface: 'var(--color-surface)',
//         muted: 'var(--color-muted)',
//         border: 'var(--color-border)',

//         /* primary */
//         primary: 'var(--color-primary)',
//         'primary-foreground': 'var(--color-primary-foreground)',

//         /* glass */
//         'glass-primary': 'var(--color-glass-primary)',

//         /* status */
//         success: 'var(--color-success)',
//         warning: 'var(--color-warning)',
//         danger: 'var(--color-danger)',
//         pending: 'var(--color-pending)',

//         /* charts */
//         chart: {
//           1: 'var(--color-chart-1)',
//           2: 'var(--color-chart-2)',
//           3: 'var(--color-chart-3)',
//           4: 'var(--color-chart-4)',
//           5: 'var(--color-chart-5)',
//         },
//       },

//       boxShadow: {
//         soft: 'var(--color-shadow)',
//       },

//       borderRadius: {
//         xl: '12px',
//         '2xl': '16px',
//       },

//       backdropBlur: {
//         xs: '2px',
//       },

//       transitionTimingFunction: {
//         smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
//       },
//     },
//   },

//   plugins: [],
// } satisfies Config;

import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class', '[data-theme="dark"]'],

  content: ['./index.html', './src/**/*.{ts,tsx}'],

  theme: {
    extend: {
      colors: {
        /* base */
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',

        /* surfaces */
        surface: 'var(--color-surface)',
        'surface-2': 'var(--color-surface-2)',
        'surface-3': 'var(--color-surface-3)',

        /* text */
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-tertiary': 'var(--color-text-tertiary)',
        'text-inverse': 'var(--color-text-inverse)',
        'text-disabled': 'var(--color-text-disabled)',

        /* borders */
        border: 'var(--color-border)',

        /* primary */
        primary: 'var(--color-primary)',
        'primary-hover': 'var(--color-primary-hover)',
        'primary-active': 'var(--color-primary-active)',
        'primary-disabled': 'var(--color-primary-disabled)',
        'primary-foreground': 'var(--color-primary-foreground)',

        /* secondary */
        secondary: 'var(--color-secondary)',
        'secondary-hover': 'var(--color-secondary-hover)',
        'secondary-active': 'var(--color-secondary-active)',
        'secondary-foreground': 'var(--color-secondary-foreground)',

        /* status */
        success: 'var(--color-success)',
        'success-bg': 'var(--color-success-bg)',
        'success-foreground': 'var(--color-success-foreground)',

        warning: 'var(--color-warning)',
        'warning-bg': 'var(--color-warning-bg)',
        'warning-foreground': 'var(--color-warning-foreground)',

        danger: 'var(--color-danger)',
        'danger-bg': 'var(--color-danger-bg)',
        'danger-foreground': 'var(--color-danger-foreground)',

        /* inputs */
        'input-bg': 'var(--color-input-bg)',
        'input-border': 'var(--color-input-border)',
        'input-border-focus': 'var(--color-input-border-focus)',
        'input-placeholder': 'var(--color-input-placeholder)',

        /* navigation */
        tab: 'var(--color-tab)',
        'tab-hover': 'var(--color-tab-hover)',
        'tab-active': 'var(--color-tab-active)',
        'tab-border': 'var(--color-tab-border)',

        /* charts */
        chart: {
          1: 'var(--color-chart-1)',
          2: 'var(--color-chart-2)',
          3: 'var(--color-chart-3)',
          4: 'var(--color-chart-4)',
          5: 'var(--color-chart-5)',
        },

        /* focus */
        'focus-ring': 'var(--color-focus-ring)',
      },

      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
      },

      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },

      ringColor: {
        DEFAULT: 'var(--color-focus-ring)',
      },

      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },

  plugins: [],
} satisfies Config;
