import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'sonner';
import './style/index.css';

import App from './App.tsx';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <Toaster richColors />
  </React.StrictMode>
);
