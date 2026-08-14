import { createContext, useContext, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
    getCurrentUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
} from "../services/authService";
import { ApiError } from "../services/apiClient";

const AuthContext = createContext(null);

export function AuthProvider ({ children }) {
    const [accessToken, setAccessToken] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const tokenRef = useRef(null);
    const refreshInFlight = useRef(null);

    function applyAccessToken(token) {
        tokenRef.current = token;
        setAccessToken(token);
    }

    async function login(formData) {
        const response = await loginUser(formData);
        const token = response.accessToken;

        if (!token) {
            throw new Error("no access token was returned")
        }

        const currentUser = await getCurrentUser(token);

        applyAccessToken(token);
        setUser(currentUser);
    }

    async function restoreSession() {
        try {
            await loadSession()
        } catch {
            applyAccessToken(null);
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    async function logout() {
         try {
            await logoutUser();
         } finally {
            applyAccessToken(null);
            setUser(null);
         }
    }
    async function loadSession() {
        const response = await refreshAccessToken();
        const token = response.accessToken;
        if (!token) throw new Error("no access token returned from refresh");
        const currentUser = await getCurrentUser(token);
        applyAccessToken(token);
        setUser(currentUser);
    }

    /**
     * Exchanges the refresh cookie for a new access token. 
     */
    const renewAccessToken = useCallback(async () => {
        if (!refreshInFlight.current) {
            refreshInFlight.current = refreshAccessToken()
                .then(response => {
                    const token = response.accessToken;
                    if (!token) throw new Error("no access token returned from refresh");
                    applyAccessToken(token);
                    return token;
                })
                .finally(() => { refreshInFlight.current = null });
        }
        return refreshInFlight.current;
    }, []);

    /**
     * Runs an authenticated request, retrying once against a fresh access token
     */
    const authedRequest = useCallback(async (call) => {
        try {
            return await call(tokenRef.current);
        } catch (err) {
            if (!(err instanceof ApiError) || err.status !== 401) throw err;

            let freshToken;
            try {
                freshToken = await renewAccessToken();
            } catch {
                applyAccessToken(null);
                setUser(null);
                throw err;
            }
            return call(freshToken);
        }
    }, [renewAccessToken]);

    const value = useMemo(
        () => ({
            accessToken,
            user,
            loading,
            isAuthenticated: !!accessToken && !!user,
            login,
            logout,
            setAccessToken: applyAccessToken,
            setUser,
            authedRequest,
        }),
        [accessToken, user, loading, authedRequest]
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


