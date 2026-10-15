import React, { useEffect } from 'react';
import { FaCheckCircle, FaTimes } from 'react-icons/fa';
import './Toast.css';

// Single toast item
const ToastItem = ({ id, message, type = 'success', onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => onClose(id), 3000);
        return () => clearTimeout(timer);
    }, [id, onClose]);

    return (
        <div className={`toast toast-${type}`}>
            <span className="toast-icon">
                {type === 'success' && <FaCheckCircle />}
            </span>
            <span className="toast-message">{message}</span>
            <button
                className="toast-close"
                onClick={() => onClose(id)}
                aria-label="Close notification"
            >
                <FaTimes />
            </button>
        </div>
    );
};

// Toast container — renders all active toasts
const Toast = ({ toasts, onClose }) => {
    if (!toasts || toasts.length === 0) return null;

    return (
        <div className="toast-container">
            {toasts.map((toast) => (
                <ToastItem
                    key={toast.id}
                    id={toast.id}
                    message={toast.message}
                    type={toast.type}
                    onClose={onClose}
                />
            ))}
        </div>
    );
};

export default Toast;