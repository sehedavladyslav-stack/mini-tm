import type { JSX } from 'react';
import favicon from '../../../assets/favicon.svg';

const LOGO_ALT = 'Task Manager';

function Logo(): JSX.Element {
  return (
    <div
      className="group relative col-span-1 grid overflow-hidden bg-linear-to-br from-zinc-900 to-zinc-700 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_10px_24px_rgba(0,0,0,0.28)]"
      id="logo"
    >
      <div className="pointer-events-none absolute -left-6 -top-6 h-24 w-24 rounded-full bg-teal-200/40 blur-2xl" />
      <img
        className="relative mx-auto w-[clamp(40px,8vw,78px)] drop-shadow-[0_8px_14px_rgba(0,0,0,0.35)] transition-all duration-200 ease-out group-hover:-translate-y-0.5 group-hover:scale-105 group-hover:-rotate-3 group-hover:drop-shadow-[0_12px_18px_rgba(0,0,0,0.42)]"
        src={favicon}
        alt={LOGO_ALT}
      />
    </div>
  );
}

export { Logo };
