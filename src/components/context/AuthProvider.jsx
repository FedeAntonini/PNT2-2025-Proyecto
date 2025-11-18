import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router";
import { toast } from 'react-toastify'
import { LoginException } from "../auth/LoginException";
const API_BASE = import.meta.env.VITE_API_BASE;

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()
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

            const data = await res.json()

            if (!res.ok) {
                throw new LoginException(data.message, data.error)
            }

            setToken(data.accessToken);
            setError(null)
            navigate('/')
            return true;
        } catch (err) {
            switch (err.error) {
                case "NotAuthorizedException": {
                    toast.error("Usuario o contraseña incorrecta")
                    break;
                }
                case "UserNotConfirmedException": {
                    toast.error("Verifique su cuenta de correo antes de continuar")
                    break;
                }
                default: {
                    toast.error(err.message)
                    break;
                }
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
    const signup = async (username, email, password) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE}/auth/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json()

            if (!response.ok) {
                throw new LoginException(data.message, data.error)
            }

            setError(null)
            navigate('/login')
        } catch (err) {
            switch (err.error) {
                case "UsernameExistsException": {
                    toast.error("El usuario ya existe")
                    break;
                }
                default: {
                    toast.error(err.message)
                    break;
                }
            }
            return false;
        } finally {
            setLoading(false);
        }
    };
    return (
        <AuthContext.Provider value={{ user, login, logout, signup, loading, error, token }}>
            {children}
        </AuthContext.Provider>
    );
};
