import { useMemo, useState } from 'react';
import Topbar from './Topbar';
import RoomsList from './RoomsList';
import OnlineList from './OnlineList';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import './chat.css';
import { useChat } from '../hooks/useChat';
import RoomInput from './RoomInput';

export default function ChatLayout() {
  const { messages, roomId } = useChat()
  // Salas mock
  const rooms = [];

  // Usuarios online mock
  const online = Array.from({ length: 10 }, (_, i) => ({ id: i + 1, name: 'Contacto' }));


  return (
    <div className="chat-page">
      {/* TOPBAR centrada (dock en el medio) */}
      <Topbar />

      {/* Shell a pantalla completa */}
      <div className="chat-shell">
        {/* Izquierda: Salas */}
        <aside className="sidebar-left">
          <div className="sidebar-title">SALAS</div>
          <RoomsList
            rooms={rooms}
          />
          <RoomInput />
        </aside>

        {/* Centro: Header + Mensajes + Input */}
        <main className="chat-main">
          <header className="chat-header">{roomId}</header>
          <MessageList messages={messages} />
          <ChatInput />
        </main>

        {/* Derecha: Online */}
        <aside className="sidebar-right">
          <div className="sidebar-title">ONLINE</div>
          <OnlineList users={online} />
        </aside>
      </div>
    </div>
  );
}
