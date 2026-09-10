import { useChat } from "@ai-sdk/react"
import MessageList from "./MessageList"
import MessageInput from "./MessageInput"

function ChatWindow() {
    const { messages, sendMessage, status, error, reload } = useChat()
    const isLoading = status === "submitted" || status === "streaming"
    return (
        <div className="chat-window">
            <div className="chat-header">
                <h1>Honda Assistant</h1>
            </div>
            <MessageList messages={messages} isLoading={isLoading} error={error} onRetry={reload} />
            <MessageInput onSend={sendMessage} isLoading={isLoading} />
        </div>
    )
}

export default ChatWindow