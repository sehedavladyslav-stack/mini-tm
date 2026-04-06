import { useState, useEffect } from 'react';

type Theme = 'dark' | 'light';

function getInitialTheme(): Theme {
  const savedTheme = localStorage.getItem('app-theme');
  return savedTheme === 'light' ? 'light' : 'dark';
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  function handleThemeToggle() {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  }

  return { handleThemeToggle, theme };
}
