import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './src/app/App';

async function enableMocking() {
  if (!import.meta.env.DEV) return;

  const { worker } = await import('./src/shared/mocks/browser');

  return worker.start();
}
enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});
