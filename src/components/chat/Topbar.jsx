import { FaCog, FaHome, FaQuestionCircle } from 'react-icons/fa';
import UserMenu from './UserMenu';

export default function Topbar() {
  return (
    <div className="topbar topbar-centered">
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
        <UserMenu />
      </div>
    </div>
  );
}
