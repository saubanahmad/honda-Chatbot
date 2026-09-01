import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

function MessageList({ messages }) {
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages])
    return (
        <div className="message-list">
            {messages.length === 0 && (
                <div className="empty-state">
                    <p>👋 Start a conversation!</p>
                    <p className="empty-hint">Type a message below to begin.</p>
                </div>
            )}
            {messages.map((msg, index) =>
            (
                <MessageBubble key={index} message={msg} />
            ))}
            <div ref={messagesEndRef} />
        </div>
    );
}
export default MessageList;