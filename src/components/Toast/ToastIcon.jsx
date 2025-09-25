import React from "react";

export default function ToastIcon({ type }) {
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
}
