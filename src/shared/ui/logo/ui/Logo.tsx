import type { JSX } from 'react';
import favicon from '../../../assets/favicon.svg';

const LOGO_ALT = 'Task Manager';

function Logo(): JSX.Element {
  return (
    <div className="group relative col-span-1 grid overflow-hidden text-center" id="logo">
      <div />
      <img className="relative mx-auto w-[clamp(40px,8vw,78px)]" src={favicon} alt={LOGO_ALT} />
    </div>
  );
}

export { Logo };
