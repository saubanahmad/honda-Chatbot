import './MessageBubble.css'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

function MessageBubble({ message }) {
    const isUser = message.role === "user"

    // Extract text and ensure it's a string
    const rawText = message.parts
        ? message.parts.filter(part => part.type === "text").map(part => part.text).join('')
        : (message.content || message.text)

    const text = String(rawText || '')

    return (
        <div className={`message-bubble ${isUser ? "user" : "assistant"}`}>
            <span className="message-role">{isUser ? "You" : "Honda Assistant"}</span>
            <div className="message-content">
                {isUser ? (
                    text
                ) : (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {text}
                    </ReactMarkdown>
                )}
            </div>
        </div>
    )
}

export default MessageBubble
