import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import "./auth.css";

export const LoginForm = () => {
    const { user, loading, logout, login, error } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    if (user) {
        return (
            <div className="auth-container">
                <h2>Welcome, {user.email}</h2>
                <button onClick={logout}>Logout</button>
            </div>
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password);
    };

    return (
        <form onSubmit={handleSubmit} className="auth-container">
            <h2>Welcome back!</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
            </button>
            {error && <p className="error">{error}</p>}
        </form>
    );
};
