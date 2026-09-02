import { useState } from "react"

function MessageInput({ onSend }) {
    const [inputValue, setInputValue] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!inputValue.trim()) return
        onSend({ role: "user", content: inputValue.trim() })
        setInputValue("")
    }
    return (
        <form className="message-input" onSubmit={handleSubmit}>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                autoComplete="off"
            />
            <button type="submit" disabled={!inputValue.trim()}>
                Send
            </button>
        </form>
    )
}
export default MessageInput