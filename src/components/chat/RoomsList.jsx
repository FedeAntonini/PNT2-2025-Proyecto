import { useChat } from "../hooks/useChat";
export default function RoomsList({ selectedId }) {
    const { rooms, joinRoom } = useChat()
    return (
        <ul className="rooms-list">
            {rooms.map((r) => (
                <li
                    key={r}
                    className={`rooms-item ${selectedId === r ? 'active' : ''}`}
                    onClick={() => joinRoom(r)} >
                    {r}
                </li>
            ))}
        </ul>
    );
}
