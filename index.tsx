
import React from 'react';
import ReactDOM from 'react-dom/client';
// FIX: The import path for the main 'App' component is updated to point to './components/App' to match the project structure.
import App from './components/App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
