function MessageInput({ input, handleInputChange, handleSubmit }) {
    return (
        <form className="message-input" onSubmit={handleSubmit}>
            <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Type your message..."
                autoComplete="off"
            />
            <button type="submit" disabled={!input.trim()}>
                Send
            </button>
        </form>
    )
}
export default MessageInput