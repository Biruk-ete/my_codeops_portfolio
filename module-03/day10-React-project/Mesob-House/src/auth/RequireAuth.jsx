import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const RequireAuth = ({ children, allowGuests = true }) => {
    const { user } = useAuth();
    const location = useLocation();

    if (!user) {
        return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }

    if (!allowGuests && user.isGuest) {
        return <Navigate to="/register" state={{ from: location.pathname }} replace />;
    }


    return children;
};