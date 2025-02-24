import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ allowedRoles }) => {
    const user = useSelector((state) => state.auth);
    if (!user) {
        return <Navigate to="/" replace />;
    }

    if (!allowedRoles.includes(user?.user?.role)) {
        return <Navigate to="/unauthorizedPage" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
