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
        'rounded-md px-3 py-2 text-sm font-medium text-foreground shadow-(--app-shadow) transition-colors hover:bg-muted/70 md:text-base ' +
        (isActive ? ' bg-muted text-primary-foreground' : '')
      }
      to={to}
    >
      {children}
    </NavLink>
  );
}
