export default function MessageList({ messages = [] }) {
    return (
        <div className="chat-messages">
            {messages.map((m, index) => (
                <div key={index} className={"bubble-row " + m.side}>  
                    <div className="bubble"> <div className="username"> {m.username} </div> {m.message ?? 'Texto'}</div>
                </div>
            ))}
            <div className="messages-bottom-spacer" />
        </div>
    );
}
