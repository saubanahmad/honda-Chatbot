import { useState } from "react"

function MessageInput({ onSend, isLoading }) {
    const [inputValue, setInputValue] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!inputValue.trim() || isLoading) return
        onSend({ role: "user", content: inputValue.trim() })
        setInputValue("")
    }
    return (
        <form className="message-input" onSubmit={handleSubmit}>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={isLoading ? "Waiting for response..." : "Type your message..."}
                autoComplete="off"
                disabled={isLoading}
            />
            <button type="submit" disabled={!inputValue.trim() || isLoading}>
                <span className="btn-text">Send</span>
                <svg className="btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
            </button>
        </form>
    )
}
export default MessageInput