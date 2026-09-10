import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

function MessageList({ messages, isLoading, error, onRetry }) {
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading])
    return (
        <div className="message-list">
            {messages.length === 0 && !isLoading && !error && (
                <div className="empty-state">
                    <p>Start a conversation!</p>
                    <p className="empty-hint">Type a message below to begin.</p>
                </div>
            )}
            {messages.map((msg, index) =>
            (
                <MessageBubble key={index} message={msg} />
            ))}
            {isLoading && (
                <div className="message-bubble assistant typing-indicator">
                    <span className="message-role">Honda Assistant</span>
                    <div className="typing-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            )}
            {error && (
                <div className="error-message">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <div className="error-text">
                        <p>Something went wrong. Please try again.</p>
                    </div>
                    <button className="retry-btn" onClick={onRetry}>Retry</button>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>
    );
}
export default MessageList;