import { useEffect, useRef, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import UserMenuItems from "./UserMenuItems";

export default function UserMenu() {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);
    const { user } = useAuth()
    useEffect(() => {
        const onClick = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener('mousedown', onClick);
        return () => document.removeEventListener('mousedown', onClick);
    }, []);

    return (
        <div className="dock-avatar-wrap" ref={menuRef}>
            <button
                type="button"
                className="avatar-btn"
                onClick={() => setOpen(v => !v)}
                aria-haspopup="menu"
                aria-expanded={open}
                aria-label="Usuario"
            >
                <div><FaUser /></div>
            </button>

            {open && (
                <div className="user-menu" role="menu">
                    <UserMenuItems closeMenu={() => setOpen(false)} />
                </div>
            )}
        </div>
    )
}