'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useCart } from './CartContext';

const AuthContext = createContext();
const USER_STORAGE_KEY = 'mesob-user';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const { clearCart } = useCart();

    useEffect(() => {
        try {
            const saved = localStorage.getItem(USER_STORAGE_KEY);
            if (saved) setUser(JSON.parse(saved));
        } catch (err) {
            console.warn('Failed to load user from storage:', err);
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (!isLoaded) return;
        try {
            if (user) {
                localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
            } else {
                localStorage.removeItem(USER_STORAGE_KEY);
            }
        } catch (err) {
            console.warn('Failed to save user to storage:', err);
        }
    }, [user, isLoaded]);

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
        clearCart();
    };

    const continueAsGuest = () => {
        setUser({ name: 'Guest', email: null, isGuest: true });
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, continueAsGuest }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);