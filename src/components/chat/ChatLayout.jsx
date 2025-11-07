import { useMemo, useState } from 'react';
import Topbar from './Topbar';
import RoomsList from './RoomsList';
import OnlineList from './OnlineList';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import './chat.css';

export default function ChatLayout() {
  // Salas mock
  const rooms = [
    { id: 'general', name: 'Sala general' },
    { id: 'equipo', name: 'Equipo' },
    { id: 'random', name: 'Random' },
    { id: 'soporte', name: 'Soporte' },
  ];

  // Usuarios online mock
  const online = Array.from({ length: 10 }, (_, i) => ({ id: i + 1, name: 'Contacto' }));

  // Mensajes mock con roomId
  const allMessages = [
    { id: 1, roomId: 'general', text: 'Hola!', side: 'left' },
    { id: 2, roomId: 'general', text: '¿Todo bien?', side: 'left' },
    { id: 3, roomId: 'general', text: 'Sí, todo ok', side: 'right' },
    { id: 4, roomId: 'equipo', text: 'Sprint hoy', side: 'left' },
    { id: 5, roomId: 'random', text: 'Memes', side: 'right' },
    { id: 6, roomId: 'soporte', text: 'Ticket #123', side: 'left' },
  ];

  // Sala seleccionada
  const [selectedRoomId, setSelectedRoomId] = useState(rooms[0].id);

  // Filtrar mensajes de la sala actual
  const messages = useMemo(
    () => allMessages.filter(m => m.roomId === selectedRoomId),
    [allMessages, selectedRoomId]
  );

  // Nombre para el header
  const roomName = useMemo(
    () => rooms.find(r => r.id === selectedRoomId)?.name ?? 'Sala...',
    [rooms, selectedRoomId]
  );

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
            selectedId={selectedRoomId}
            onSelect={setSelectedRoomId}
          />
        </aside>

        {/* Centro: Header + Mensajes + Input */}
        <main className="chat-main">
          <header className="chat-header">{roomName}</header>
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
