import { useChat } from "../hooks/useChat";

export default function OnlineList() {
    const { roomUsers } = useChat()
    return (
        <ul className="online-list">
            {roomUsers.map((user) => (
                <li key={user.id} className="online-item">
                    <span className="dot-online" /> {user.username}
                </li>
            ))}
        </ul>
    );
}
