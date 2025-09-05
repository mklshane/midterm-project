import React, { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 5000);
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}

      {/* Toast Container */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`toast-notification toast-${toast.type}`}
          >
            <div className="toast-content">
              <div className="toast-icon-container">
                {getIconForType(toast.type)}
              </div>
              <div className="toast-message-container">
                <p className="toast-message">{toast.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);

// Helper function to get icon for toast type
const getIconForType = (type) => {
  const icons = {
    info: (
      <svg
        className="toast-icon toast-icon-info"
        viewBox="0 0 24 24"
        width="20"
        height="20"
      >
        <path
          fill="currentColor"
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
        />
      </svg>
    ),
    success: (
      <svg
        className="toast-icon toast-icon-success"
        viewBox="0 0 24 24"
        width="20"
        height="20"
      >
        <path
          fill="currentColor"
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
        />
      </svg>
    ),
    error: (
      <svg
        className="toast-icon toast-icon-error"
        viewBox="0 0 24 24"
        width="20"
        height="20"
      >
        <path
          fill="currentColor"
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
        />
      </svg>
    ),
  };
  return icons[type] || icons.info;
};
