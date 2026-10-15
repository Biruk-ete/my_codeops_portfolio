import React, { createContext, useContext, useState, useEffect } from 'react';
import { useCart } from './CartContext';

const AuthContext = createContext();

const USER_STORAGE_KEY = 'mesob-user';

export const AuthProvider = ({ children }) => {
    // Load user from localStorage on first mount
    const [user, setUser] = useState(() => {
        try {
            const saved = localStorage.getItem(USER_STORAGE_KEY);
            return saved ? JSON.parse(saved) : null;
        } catch (err) {
            console.warn('Failed to load user from storage:', err);
            return null;
        }
    });

    // Get access to clearCart so we can clear on logout
    const { clearCart } = useCart();

    // Save user to localStorage whenever it changes
    useEffect(() => {
        try {
            if (user) {
                localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
            } else {
                localStorage.removeItem(USER_STORAGE_KEY);
            }
        } catch (err) {
            console.warn('Failed to save user to storage:', err);
        }
    }, [user]);

    // Called from Login.jsx
    const login = (userData) => {
        setUser(userData);
    };

    // Called from Navbar / Account page — clears cart too
    const logout = () => {
        setUser(null);
        clearCart();
    };

    // Called from Login.jsx "Continue as Guest"
    const continueAsGuest = () => {
        setUser({ name: 'Guest', email: null, isGuest: true });
    };

    return (
        <AuthContext.Provider
            value={{ user, login, logout, continueAsGuest }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);