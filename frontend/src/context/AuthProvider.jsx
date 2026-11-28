
import { useCallback, useEffect, useState } from "react";
import AuthContext from "./authContext";
import api from "../services/api";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check whether user is logged in
    const checkAuth = useCallback(async () => {
        try {
            const response = await api.get("/auth/me");
            setUser(response.data.user);

        } catch (error) {
            console.log("Authentication check failed:", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);


    // Logout user
    const logout = async () => {
        await api.post("/auth/logout");

        setUser(null);
    };

    // Run when application starts
    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                checkAuth,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
