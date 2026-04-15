import { Outlet } from 'react-router';
import { Logo, Button } from '@shared/index';
import { useTheme } from '../hooks/useTheme';
import { Link } from './Link';

function AppLayout() {
  const { handleThemeToggle, theme } = useTheme();

  return (
    <div className="grid min-h-dvh grid-cols-[200px_1fr] grid-rows-[45px_1fr_auto] md:grid md:grid-cols-[250px_1fr] md:grid-rows-[55px_1fr_auto]">
      <Logo />
      <header className="col-start-2 flex items-center justify-between px-5 text-2xl font-semibold tracking-wide">
        <h1 className="flex flex-wrap text-lg md:text-2xl">Task Manager</h1>
        <Button variant={'secondary'} onClick={handleThemeToggle}>
          {theme === 'dark' ? 'Light mode' : 'Dark mode'}
        </Button>
      </header>
      <aside className="border-border col-start-1 row-span-2 row-start-2 border-r-2 pt-4 pl-3">
        <nav className="flex flex-col gap-4 overflow-auto pr-2">
          <Link to="/">Dashboard</Link>
          <Link to="/tasks">Task</Link>
          <Link to="/profile">Profile</Link>
        </nav>
      </aside>
      <main className="col-start-2 row-start-2 flex flex-row p-4">
        <Outlet />
      </main>
      <footer className="col-span-2 row-start-3 px-4 py-3 text-center text-sm">
        <p>&copy; 2026 Task Manager</p>
      </footer>
    </div>
  );
}

export { AppLayout };
