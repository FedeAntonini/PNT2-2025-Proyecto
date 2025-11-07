import { useState, useRef, useEffect } from 'react';
import { FaPlus, FaMicrophone, FaFileAlt, FaImage, FaVideo } from 'react-icons/fa';

export default function ChatInput() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  // Cerrar el menú si se clickea fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="chat-input">
      {/* Botón + con menú */}
      <div className="attach-wrapper" ref={wrapRef}>
        <button
          type="button"
          className="btn-plus"
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="menu"
          aria-expanded={open}
          aria-label="Adjuntar archivo"
        >
          <FaPlus />
        </button>

        {open && (
          <div className="attach-menu" role="menu">
            <button className="attach-item" role="menuitem" type="button">
              <FaFileAlt className="attach-icon" /> Documentos
            </button>
            <button className="attach-item" role="menuitem" type="button">
              <FaImage className="attach-icon" /> Fotos
            </button>
            <button className="attach-item" role="menuitem" type="button">
              <FaVideo className="attach-icon" /> Videos
            </button>
          </div>
        )}
      </div>

      {/* Input de texto */}
      <input className="chat-text" placeholder="Escribe tu texto..." />

      {/* Mic (ícono real) */}
      <button type="button" className="btn-mic" aria-label="Grabar audio">
        <FaMicrophone />
      </button>
    </div>
  );
}
