import type { JSX } from 'react';
import favicon from '../../../assets/favicon.svg';

const LOGO_ALT = 'Task Manager';

function Logo(): JSX.Element {
  return (
    <div className="border-border col-start-1 flex justify-center border-r-2 text-center shadow-sm">
      <img className="inline max-w-none" src={favicon} alt={LOGO_ALT} />
    </div>
  );
}

export { Logo };
