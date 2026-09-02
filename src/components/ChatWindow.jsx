import { useChat } from "@ai-sdk/react"
import MessageList from "./MessageList"
import MessageInput from "./MessageInput"

function ChatWindow() {
    const { messages, sendMessage } = useChat()
    return (
        <div className="chat-window">
            <div className="chat-header">
                <h1>Honda Assistant</h1>
                <span className="status-badge">Virtual Guide</span>
            </div>
            <MessageList messages={messages} />
            <MessageInput onSend={sendMessage} />
        </div>
    )
}

export default ChatWindow