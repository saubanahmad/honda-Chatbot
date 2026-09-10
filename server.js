import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { google } from '@ai-sdk/google'
import { streamText, embed } from 'ai'
import { Pinecone } from '@pinecone-database/pinecone'

const app = express()
const PORT = 3001
const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY })
const index = pc.index('hobot-knowledge')

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
    try {
        const { messages } = req.body

        const latestMessage = messages[messages.length - 1].content ||
            messages[messages.length - 1].parts.
                filter(p => p.type === 'text').map(p => p.text).join('')

        const { embedding } = await embed({
            model: google.textEmbeddingModel('gemini-embedding-2'),
            value: latestMessage,
        })

        const searchResults = await index.query({
            vector: embedding,
            topK: 3,
            includeMetadata: true,
        })

        const context = searchResults.matches.map(match => match.metadata.text).join('\n\n')

        const result = streamText({
            model: google('gemini-3-flash-preview'),
            system: `You are Hobot, the official customer service AI for Honda Atlas Pakistan.
                Your job is to assist users with inquiries about Honda cars, services, and corporate information.
                Tone: Professional, helpful, sleek, and corporate. Do not be overly playful or use emojis.
    
                CRITICAL RULES:
                1. You only answer questions related to Honda, cars, driving, or Honda Atlas Pakistan.
                2. If a user asks a question completely unrelated to cars or Honda (like "how to bake a cake" or "write a python script"), you must politely refuse and steer the conversation back to Honda vehicles.
                3. Keep your answers concise and easy to read.
                4. Base your answers on the following knowledge base context. If the context contains relevant information, use it. If not, use your general knowledge about Honda.
                5. IMPORTANT FORMATTING: When asked to provide a table, YOU MUST format it as a valid Markdown table with proper newlines. DO NOT put the entire table on a single line. Every row must be on a new line.
                KNOWLEDGE BASE CONTEXT: ${context}`,
            messages: convertMessages(messages),
        })
        result.pipeUIMessageStreamToResponse(res)
    } catch (error) {
        console.error('Chat API error:', error)
        if (!res.headersSent) {
            res.status(500).json({ error: 'Something went wrong. Please try again.' })
        }
    }
})

app.listen(PORT, () => {
    console.log(`Server running http://localhost:${PORT}`)
})
