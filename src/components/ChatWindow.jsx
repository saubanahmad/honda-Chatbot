import { useState } from "react"
import MessageList from "./MessageList"
import MessageInput from "./MessageInput"

function ChatWindow() {
    const [messages, setMessages] = useState([])
    const handleSendMessage = (text) => {
        const userMessage = { role: 'user', content: text }
        const aiMessage = {
            role: "assistant",
            content: `You said: "${text}". I'm Hobot — Honda Virtual Assistant, currently under production`
        }
        setMessages(prev => [...prev, userMessage, aiMessage])
    }
    return (
        <div className="chat-window">
            <div className="chat-header">
                <h1>Honda Assistant</h1>
                <span className="status-badge">Virtual Guide</span>
            </div>
            <MessageList messages={messages} />
            <MessageInput onSend={handleSendMessage} />
        </div>
    )
}

export default ChatWindow