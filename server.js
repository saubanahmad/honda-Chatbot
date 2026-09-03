import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { google } from '@ai-sdk/google'
import { streamText } from 'ai'

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

function convertMessages(messages) {
    return messages.map(msg => {
        if (typeof msg.content === 'string') {
            return { role: msg.role, content: msg.content }
        }
        if (msg.parts) {
            const text = msg.parts
                .filter(part => part.type === 'text')
                .map(part => part.text)
                .join('')
            return { role: msg.role, content: text }
        }
        return msg
    })
}
app.post('/api/chat', async (req, res) => {
    const { messages } = req.body
    const result = streamText({
        model: google('gemini-3-flash-preview'),
        system: `You are Hobot, the official customer service AI for Honda Atlas Pakistan.
                Your job is to assist users with inquiries about Honda cars, services, and corporate information.
                Tone: Professional, helpful, sleek, and corporate. Do not be overly playful or use emojis.
    
                CRITICAL RULES:
                1. You only answer questions related to Honda, cars, driving, or Honda Atlas Pakistan.
                2. If a user asks a question completely unrelated to cars or Honda (like "how to bake a cake" or "write a python script"), you must politely refuse and steer the conversation back to Honda vehicles.
                3. Keep your answers concise and easy to read.`,
        messages: convertMessages(messages),
    })
    result.pipeUIMessageStreamToResponse(res)
})

app.listen(PORT, () => {
    console.log(`Server running http://localhost:${PORT}`)
})
