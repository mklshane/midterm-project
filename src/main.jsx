import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ToastProvider } from './contexts/ToastContext';
import { AuthProvider } from './contexts/AuthContext';
import { BookingsProvider } from './contexts/BookingsContext';


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastProvider>
      <AuthProvider>
        <BookingsProvider>
          <App />
        </BookingsProvider>
      </AuthProvider>
    </ToastProvider>
  </React.StrictMode>
);