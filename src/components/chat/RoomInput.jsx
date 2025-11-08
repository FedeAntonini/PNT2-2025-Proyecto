import { FaMessage } from "react-icons/fa6";
import { useChat } from "../hooks/useChat";
import { useState } from "react";

export default function RoomInput() {
    const { joinRoom } = useChat()
    const [room, setRoom] = useState("")
    const handleJoinRoom = () => joinRoom(room)
    return (
        <div className="room-input">
            {/* Input de texto */}
            <input className="chat-text" placeholder="Escribe tu texto..." value={room} onChange={(e) => setRoom(e.target.value)} />

            {/* Mic (ícono real) */}
            <button type="button" className="btn-mic" onClick={handleJoinRoom}>
                <FaMessage />
            </button>
        </div>
    )
}