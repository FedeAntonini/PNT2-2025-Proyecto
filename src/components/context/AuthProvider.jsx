import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

const API_BASE = import.meta.env.VITE_API_BASE;

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    // Restaurar sesión al cargar
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");
        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        }
    }, []);

    useEffect(() => {
        async function fetchUser() {
            setLoading(true)
            try {
                const res = await fetch(`${API_BASE}/auth/me`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token
                    }
                });
                const data = await res.json()
                const userData = {
                    username: data?.username,
                    email: data?.attributes?.email,
                    id: data?.attributes?.sub
                }
                setUser(userData)
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message)
                } else {
                    console.error("Error logging in:", err);
                }
                return false;
            } finally {
                setLoading(false)
            }
        }
        if (token) {
            fetchUser()
        }
    }, [token])

    useEffect(() => {
        if (user && token) {
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        }
    }, [user, token]);

    // ---- FUNCIONES ----

    const login = async (email, password) => {
        setLoading(true)
        try {
            const res = await fetch(`${API_BASE}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: email,
                    password,
                }),
            });

            if (!res.ok) {
                throw new Error("Login failed");
            }

            const data = await res.json();
            setToken(data.accessToken);
            return true;
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message)
            } else {
                console.error("Error logging in:", err);
            }
            return false;
        } finally {
            setLoading(false)
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };
    const signup = async (email, password) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE}/auth/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error("Signup failed. Please check your input.");
            }

            setError(null)
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message)
            }
            else {
                console.error(err)
            }
        } finally {
            setLoading(false);
        }
    };
    return (
        <AuthContext.Provider value={{ user, login, logout, signup, loading, error }}>
            {children}
        </AuthContext.Provider>
    );
};
