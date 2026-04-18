import type { ReactNode } from 'react';
import { NavLink } from 'react-router';

type LinkProps = {
  to: string;
  children: ReactNode;
  icon: ReactNode;
};

export function Link({ to, children, icon }: LinkProps) {
  return (
    <>
      <NavLink
        className={({ isActive }) =>
          'active:bg-tab hover:bg-muted/60 flex gap-2 rounded-md p-2 text-sm font-medium transition-colors md:text-base' +
          (isActive ? ' bg-muted text-foreground' : '')
        }
        to={to}
      >
        {icon}
        {children}
      </NavLink>
    </>
  );
}
