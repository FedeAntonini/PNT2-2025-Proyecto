'use client';

export default function MessageList({ messages = [] }) {
    return (
        <div className="chat-messages">
            {messages.map((m) => (
                <div key={m.id} className="bubble-row left">
                    <div className="bubble">{m.text ?? 'Texto'}</div>
                </div>
            ))}
            <div className="messages-bottom-spacer" />
        </div>
    );
}
