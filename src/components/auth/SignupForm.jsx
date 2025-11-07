import { useCallback, useState } from "react";
import "./auth.css";
import { useAuth } from "../hooks/useAuth";

export const SignupForm = () => {
    const { loading, signup } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = useCallback((e) => {
        e.preventDefault()
        signup(email, password)
    }, [email, password])

    return (
        <form onSubmit={handleSignup} className="auth-container">
            <h2>Sign Up</h2>
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
                {loading ? "Creating account..." : "Sign Up"}
            </button>
        </form>
    );
};
