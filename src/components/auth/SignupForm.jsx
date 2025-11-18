import { useCallback, useState } from "react";
import "./auth.css";
import { useAuth } from "../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";

export const SignupForm = () => {
    const { loading, signup } = useAuth();
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/;

    const handleSignup = useCallback((e) => {
        e.preventDefault()
        if (!passwordRegex.test(password)) {
            toast.error("La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial.");
            return;
        }
        signup(username, email, password)
    }, [email, password])

    return (
        <form onSubmit={handleSignup} className="auth-container">
            <h2>Registrar</h2>
            <input
                type="username"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
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
            <ToastContainer />
        </form>
    );
};
