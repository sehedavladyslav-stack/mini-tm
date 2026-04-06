import { Outlet } from 'react-router';
import { Logo, Button } from '@shared/index';
import { useTheme } from '../hooks/useTheme';
import { Link } from './Link';

function AppLayout() {
  const { handleThemeToggle, theme } = useTheme();

  return (
    <div className="min-h-dvh grid grid-cols-[200px_1fr] grid-rows-[40px_1fr_auto] gap-3 p-3 md:grid md:grid-cols-[250px_1fr] md:grid-rows-[35px_1fr_auto] md:gap-4 md:p-4">
      <Logo />
      <header className="col-start-2 flex items-center justify-between rounded-md px-5 text-2xl font-semibold tracking-wide text-foreground">
        <h1 className="flex flex-wrap text-lg md:text-2xl">Task Manager</h1>
        <Button onClick={handleThemeToggle}>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</Button>
      </header>
      <aside className="row-start-2 col-start-1 rounded-md  p-2">
        <nav className="flex flex-col overflow-auto gap-4 p-2">
          <Link to="/">Dashboard</Link>
          <Link to="/tasks">Task</Link>
          <Link to="/profile">Profile</Link>
        </nav>
      </aside>
      <main className="row-start-2 col-start-2 flex flex-row bg-background p-4 text-foreground">
        <Outlet />
      </main>
      <footer className="col-span-2 row-start-3 px-4 py-3 bg-background text-center text-sm text-foreground">
        <p>&copy; 2026 Task Manager</p>
      </footer>
    </div>
  );
}

export { AppLayout };
