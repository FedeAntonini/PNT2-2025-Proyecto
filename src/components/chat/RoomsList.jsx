'use client';

export default function RoomsList({ rooms = [], selectedId, onSelect }) {
    return (
        <ul className="rooms-list">
            {rooms.map((r) => (
            <li
                key={r.id}
                className={`rooms-item ${selectedId === r.id ? 'active' : ''}`}
                onClick={() => onSelect(r.id)} >
                {r.name}
            </li>
            ))}
        </ul>
    );
}
