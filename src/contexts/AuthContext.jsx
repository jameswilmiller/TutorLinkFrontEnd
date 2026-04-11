import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
    getCurrentUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
} from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider ({ children }) {
    const [accessToken, setAccessToken] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    async function login(formData) {
        const response = await loginUser(formData);
        const token = response.accessToken;

        if (!token) {
            throw new Error("no access token was returned")
        }

        const currentUser = getCurrentUser(token);

        setAccessToken(token);
        setUser(currentUser);
    }

    async function restoreSession() {
        try {
            const response = await refreshAccessToken();
            const token = response.accessToken;

            if(!token) {
                throw new Error("no access token returned from refresh")
            }

            const currentUser = await getCurrentUser(token);

            setAccessToken(token);
            setUser(currentUser);
        } catch {
            setAccessToken(null);
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    async function logout() {
         try {
            await logoutUser();
         } finally {
            setAccessToken(null);
            setUser(null);
         }
    }

    const value = useMemo(
        () => ({
            accessToken,
            user,
            loading,
            isAuthenticated: !!accessToken && !!user,
            login,
            logout,
            setAccessToken,
            setUser,
        }),
        [accessToken, user, loading]
    );

    useEffect(() => {
        restoreSession();
    }, []);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuthContext() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuthContext must be used within an AuthProvider")
    }

    return context;
}

    