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

    // Run when application starts
    useEffect(() => {
        let ignore = false;

        const initializeAuth = async () => {
            try {
                const response = await api.get("/auth/me");

                if (!ignore) {
                    setUser(response.data.user);
                }
            } catch (error) {
                if (!ignore) {
                    console.log("Authentication check failed:", error);
                    setUser(null);
                }
            } finally {
                if (!ignore) {
                    setLoading(false);
                }
            }
        };

        initializeAuth();

        return () => {
            ignore = true;
        };
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                checkAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;