import { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router';
import { Logo, Button } from '@shared/index';

type Theme = 'dark' | 'light';

function getInitialTheme(): Theme {
  const savedTheme = localStorage.getItem('app-theme');
  return savedTheme === 'light' ? 'light' : 'dark';
}

function AppLayout() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  function handleThemeToggle() {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  }

  return (
    <div className="app-layout min-h-dvh grid gap-3 p-3 md:grid md:gap-4 md:p-4">
      <Logo />
      <header className="app-header flex items-center justify-between text-foreground border-border px-5 text-2xl font-semibold tracking-wide bg-background">
        <h1>Task Manager</h1>
        <Button>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</Button>
        {/* <button
          className="border border-border rounded-2xl bg-background font-bold md:min-h-12 px-3 py-0 text-sm transition duration-300 ease-out sm:min-h-6 text-foreground hover:transition hover:duration-300 hover:-translate-y-0.5 hover:bg-zinc-200 hover:dark:bg-zinc-600"
          type="button"
          onClick={handleThemeToggle}
        >
          {theme === 'dark' ? 'Light mode' : 'Dark mode'}
        </button> */}
      </header>
      <aside className="app-sidebar">
        <nav className="app-nav">
          <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to={'/'}>
            Dashboard
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to={'/tasks'}>
            Task
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to={'/profile'}>
            Profile
          </NavLink>
        </nav>
      </aside>
      <main className="app-main">
        <Outlet />
      </main>
      <footer className="app-footer">
        <p>&copy; 2026 Task Manager</p>
      </footer>
    </div>
  );
}

export { AppLayout };
