import type { ReactNode } from 'react';
import { NavLink } from 'react-router';

type LinkProps = {
  to: string;
  children: ReactNode;
};

export function Link({ to, children }: LinkProps) {
  return (
    <NavLink
      className={({ isActive }) =>
        'active:bg-tab hover:bg-muted/60 rounded-md p-2 pl-4 text-sm font-medium transition-colors md:text-base' +
        (isActive ? ' bg-muted text-foreground' : '')
      }
      to={to}
    >
      {children}
    </NavLink>
  );
}
