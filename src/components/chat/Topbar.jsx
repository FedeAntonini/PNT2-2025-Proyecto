'use client';

import { useEffect, useRef, useState } from 'react';
import { FaHome, FaCog, FaQuestionCircle, FaUser } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';

export default function Topbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const { user } = useAuth()
  // cerrar dropdown al clickear fuera
  useEffect(() => {
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <div className="topbar topbar-centered">
      {/* Dock centrado: íconos + avatar */}
      <div className="dock">
        <button type="button" className="dock-item" title="Inicio">
          <FaHome />
          <span>Inicio</span>
        </button>
        <button type="button" className="dock-item" title="Configuración">
          <FaCog />
          <span>Config</span>
        </button>
        <button type="button" className="dock-item" title="Ayuda">
          <FaQuestionCircle />
          <span>Ayuda</span>
        </button>

        {/* avatar + menú dentro del centro */}
        <div className="dock-avatar-wrap" ref={menuRef}>
          <button
            type="button"
            className="avatar-btn"
            onClick={() => setOpen(v => !v)}
            aria-haspopup="menu"
            aria-expanded={open}
            aria-label="Usuario"
          >
            {/* Avatar “fake”: iniciales; podés cambiar por <img src="..." /> */}
            <div><FaUser /></div>
          </button>

          {open && (
            <div className="user-menu" role="menu">
              <button className="user-menu-item" role="menuitem" type="button">Perfil</button>
              <button className="user-menu-item" role="menuitem" type="button">Iniciar sesión</button>
              <button className="user-menu-item sep" role="menuitem" type="button">Cerrar sesión</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
