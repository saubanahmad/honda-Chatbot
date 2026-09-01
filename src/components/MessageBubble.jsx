import './MessageBubble.css'

function MessageBubble({ message }) {
    const isUser = message.role === "user"

    return (
        <div className={`message-bubble ${isUser ? "user" : "assistant"}`}>
            <span className="message-role">{isUser ? "You" : "AI"}</span>
            <p className="message-content">{message.content}</p>
        </div>
    )
}

export default MessageBubble
