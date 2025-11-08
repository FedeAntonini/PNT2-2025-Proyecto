import { useState, useRef, useEffect } from 'react';
import { FaPlus, FaMicrophone, FaFileAlt, FaImage, FaVideo } from 'react-icons/fa';
import { useChat } from '../hooks/useChat';
import { FaMessage } from 'react-icons/fa6';

export default function ChatInput() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const { postMessage } = useChat()
  const [message, setMessage] = useState("")
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

  const handleSubmit = (e) => {
    e.preventDefault()
    postMessage(message)
    setMessage("")
  }
  return (
    <div >
      <form className="chat-input" onSubmit={handleSubmit}>
        <input className="chat-text" placeholder="Escribe tu texto..." value={message} onChange={(e) => setMessage(e.target.value)} />

        {/* Mic (ícono real) */}
        <button type="submit" className="btn-mic" aria-label="Grabar audio" >
          <FaMessage />
        </button>
      </form>
    </div>
  );
}
