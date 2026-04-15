import { type Config } from 'prettier';
/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */

const config: Config = {
  trailingComma: 'es5',
  singleQuote: true,
  printWidth: 100,
  semi: true,
  tabWidth: 2,
  useTabs: false,
  bracketSpacing: true,
  arrowParens: 'avoid',
  endOfLine: 'lf',
  plugins: ['prettier-plugin-tailwindcss'],
};

export default config;
