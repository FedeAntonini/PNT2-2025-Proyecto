import { useNavigate } from "react-router"
import { useAuth } from "../hooks/useAuth"

export default function UserMenuItems({ closeMenu }) {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const handleAction = (cb) => () => {
        closeMenu()
        cb()
    }
    if (user) {
        return (
            <>
                <button className="user-menu-item sep" role="menuitem" type="button" onClick={handleAction(logout)}>Cerrar sesión</button>
            </>
        )
    } else {
        return (
            <>
                <button className="user-menu-item" role="menuitem" type="button" onClick={handleAction(() => navigate('/login'))}>Iniciar sesión</button>
                <button className="user-menu-item" role="menuitem" type="button" onClick={handleAction(() => navigate('/signup'))}>Registrar</button>
            </>
        )
    }
}