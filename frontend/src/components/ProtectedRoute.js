import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ loggedIn, children }) => {
    if (!loggedIn) {
        // If the user is not logged in, redirect to the login page
        return <Navigate to="/login" />;
    }

    // If the user is logged in, render the requested component
    return children;
};

export default ProtectedRoute;
