import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './src/app/App';
import { worker } from '@shared/mocks/browser';

if (import.meta.env.DEV) {
  worker.start();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
