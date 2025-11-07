export default function OnlineList({ users = [] }) {
    return (
        <ul className="online-list">
            {users.map((_, i) => (
                <li key={i} className="online-item">
                    <span className="dot-online" /> Contacto
                </li>
            ))}
        </ul>
    );
}
