import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { i18nReadyPromise } from './config/i18n';

const root = document.getElementById('root') as HTMLElement;

// Show a simple loading state
root.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; background: #0f172a;"><div style="color: #e2e8f0; font-size: 18px;">Loading...</div></div>';

void i18nReadyPromise.then(() => {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>,
  );
}).catch((error) => {
  console.error('i18n initialization failed:', error);
  root.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; background: #0f172a;"><div style="color: #ef4444; font-size: 18px;">Initialization failed</div></div>';
});
