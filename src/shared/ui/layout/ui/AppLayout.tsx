import { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router';
import { Logo } from '@/shared';

type Theme = 'dark' | 'light';

function AppLayout() {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('app-theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      setTheme(savedTheme);
      document.body.dataset.theme = savedTheme;
      return;
    }

    document.body.dataset.theme = 'dark';
  }, []);

  function handleThemeToggle() {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.body.dataset.theme = nextTheme;
    localStorage.setItem('app-theme', nextTheme);
  }

  return (
    <div className="app-layout">
      <Logo />
      <header className="app-header">
        <h1>Task Manager</h1>
        <button className="theme-toggle" type="button" onClick={handleThemeToggle}>
          {theme === 'dark' ? 'Light mode' : 'Dark mode'}
        </button>
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
