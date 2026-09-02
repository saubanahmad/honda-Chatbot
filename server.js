import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { google } from '@ai-sdk/google'
import { streamText } from 'ai'

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

app.post('/api/chat', async (req, res) => {
    const { messages } = req.body
    const result = streamText({
        model: google('gemini-3.6-flash'),
        messages: messages,
    })
    result.pipeUIMessageStreamToResponse(res)
})

app.listen(PORT, () => {
    console.log(`Server running http://localhost:${PORT}`)
})
