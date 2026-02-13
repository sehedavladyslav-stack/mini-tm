import { NavLink, Outlet } from 'react-router';
import { Logo } from '@/shared';

function AppLayout() {
  return (
    <div className="app-layout">
      <Logo />
      <header className="app-header">
        <h1>Task Manager</h1>
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
