import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

const API_BASE = import.meta.env.VITE_API_BASE;

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    // Restaurar sesión al cargar
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");
        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        }
    }, []);

    // Guardar en localStorage cuando cambie
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
            // Supongamos que el token viene como { access_token: "..." }
            setToken(data.access_token);
            setUser({ email }); // Podrías reemplazar por info más completa si el backend devuelve más
            return true;
        } catch (err) {
            console.error("Error logging in:", err);
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
