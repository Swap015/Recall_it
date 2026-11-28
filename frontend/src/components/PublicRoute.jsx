import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/useAuth";

function PublicRoute() {
    const { user, loading } = useAuth();

    // Wait for authentication check
    if (loading) {
        return <div>Checking your session...</div>;
    }

    // Already logged in? Go to dashboard
    if (user) {
        return <Navigate to="/dashboard" replace />;
    }

    // Otherwise, allow access
    return <Outlet />;
}

export default PublicRoute;