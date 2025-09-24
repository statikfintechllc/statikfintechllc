import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from "react-error-boundary";

import App from './App.tsx'
import { ErrorFallback } from './ErrorFallback.tsx'

import "./main.css"
import "./styles/theme.css"
import "./index.css"

// Suppress ResizeObserver errors (non-critical UI errors)
const originalError = console.error;
console.error = (...args) => {
  const message = args[0];
  if (typeof message === 'string' && message.includes('ResizeObserver loop completed')) {
    return; // Suppress this specific error
  }
  originalError.apply(console, args);
};

// Also handle ResizeObserver errors that might be thrown as exceptions
window.addEventListener('error', (event) => {
  if (event.message && event.message.includes('ResizeObserver loop completed')) {
    event.preventDefault();
    return false;
  }
});

// Handle unhandled promise rejections that might be ResizeObserver related
window.addEventListener('unhandledrejection', (event) => {
  if (event.reason && typeof event.reason === 'string' && 
      event.reason.includes('ResizeObserver loop completed')) {
    event.preventDefault();
    return false;
  }
});

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <App />
   </ErrorBoundary>
)
