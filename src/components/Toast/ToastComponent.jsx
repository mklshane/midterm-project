import React from "react";
import ToastIcon from "./ToastIcon";

export default function ToastContainer({ toasts }) {
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast-notification toast-${toast.type}`}
        >
          <div className="toast-content">
            <div className="toast-icon-container">
              <ToastIcon type={toast.type} />
            </div>
            <div className="toast-message-container">
              <p className="toast-message">{toast.message}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
