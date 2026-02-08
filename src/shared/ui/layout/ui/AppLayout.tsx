import { NavLink, Outlet } from 'react-router';

function AppLayout() {
  return (
    <>
      <header>
        <h1>Task Manager</h1>
      </header>
      <aside>
        <nav>
          <NavLink to={'/'}>Dashboard</NavLink>
          <NavLink to={'/tasks'}>Task</NavLink>
          <NavLink to={'/profile'}>Profile</NavLink>
        </nav>
      </aside>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>© 2026 Task Manager</p>
      </footer>
    </>
  );
}

export { AppLayout };
