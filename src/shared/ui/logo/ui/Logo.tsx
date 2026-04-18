import type { JSX } from 'react';
import favicon from '../../../assets/favicon.svg';

const LOGO_ALT = 'Task Manager';

function Logo(): JSX.Element {
  return (
    <div className="flex justify-center text-center">
      <img className="h-12 md:h-16" src={favicon} alt={LOGO_ALT} />
    </div>
  );
}

export { Logo };
