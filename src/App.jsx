import ChatWindow from "./components/ChatWindow"
import "./App.css"

function App() {
  return (
    <div className="app">
      <ChatWindow />
      <p className="disclaimer">
        Built by <a href="http://linkedin.com/in/sauban05" target="_blank" rel="noopener noreferrer">Sauban Ahmad</a> — an independent Computer Science project.
        Not affiliated with or endorsed by Honda Atlas Pakistan.
      </p>
    </div>
  )
}

export default App