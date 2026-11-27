
import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/authContext";

function ProtectedRoute() {
    const { user, loading } = useAuth();

    // Wait until authentication check finishes
    if (loading) {
        return <div>Checking your session...</div>;
    }

    // If user is not logged in, redirect to login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // If user is logged in, show the requested page
    return <Outlet />;
}

export default ProtectedRoute;
