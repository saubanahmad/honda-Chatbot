import './MessageBubble.css'

function MessageBubble({ message }) {
    const isUser = message.role === "user"

    return (
        <div className={`message-bubble ${isUser ? "user" : "assistant"}`}>
            <span className="message-role">{isUser ? "You" : "AI"}</span>
            <p className="message-content">
                {message.parts 
                    ? message.parts.filter(part => part.type === "text").map((part, i) => <span key={i}>{part.text}</span>)
                    : (message.content || message.text)
                }
            </p>
        </div>
    )
}

export default MessageBubble
