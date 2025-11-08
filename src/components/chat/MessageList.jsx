export default function MessageList({ messages = [] }) {
    return (
        <div className="chat-messages">
            {messages.map((m, index) => (
                <div key={index} className="bubble-row left">
                    <div className="bubble">{m.text ?? 'Texto'}</div>
                </div>
            ))}
            <div className="messages-bottom-spacer" />
        </div>
    );
}
