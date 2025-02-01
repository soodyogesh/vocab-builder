import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline } from '@mui/material';
import App from './App';

// Remove default margin and add responsive viewport meta tag
const style = document.createElement('style');
style.textContent = `
  body {
    margin: 0;
    padding: 0;
    min-height: 100vh;
  }
`;
document.head.appendChild(style);

const meta = document.createElement('meta');
meta.name = 'viewport';
meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0';
document.head.appendChild(meta);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>
);
