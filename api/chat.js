import 'dotenv/config'
import { google } from '@ai-sdk/google'
import { streamText, embed } from 'ai'
import { Pinecone } from '@pinecone-database/pinecone'

const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
})

const index = pc.index('hobot-knowledge')

function convertMessages(messages) {
    return messages.map(msg => {
        if (typeof msg.content === 'string') {
            return {
                role: msg.role,
                content: msg.content,
            }
        }

        if (msg.parts) {
            const text = msg.parts
                .filter(part => part.type === 'text')
                .map(part => part.text)
                .join('')

            return {
                role: msg.role,
                content: text,
            }
        }

        return msg
    })
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({
            error: 'Method not allowed',
        })
    }

    try {
        const { messages } = req.body

        const latestMessage =
            messages[messages.length - 1].content ||
            messages[messages.length - 1].parts
                .filter(p => p.type === 'text')
                .map(p => p.text)
                .join('')

        const { embedding } = await embed({
            model: google.textEmbeddingModel('gemini-embedding-2'),
            value: latestMessage,
        })

        const searchResults = await index.query({
            vector: embedding,
            topK: 10,
            includeMetadata: true,
        })


        const context = searchResults.matches
            .map(match => match.metadata.text)
            .join('\n\n')


        const result = streamText({
            model: google('gemini-3-flash-preview'),

            system: `You are Hobot, the official customer service AI for Honda Atlas Pakistan.

Your job is to assist users with inquiries about Honda cars, services, and corporate information.

Tone: Professional, helpful, sleek, and corporate. Do not be overly playful or use emojis.

CRITICAL RULES:

1. You only answer questions related to Honda, cars, driving, or Honda Atlas Pakistan.

2. If a user asks a question completely unrelated to cars or Honda (like "how to bake a cake" or "write a python script"), you must politely refuse and steer the conversation back to Honda vehicles.

3. Keep your answers concise and easy to read.

4. Use the following knowledge base context as the primary source for Honda Atlas Pakistan-specific information. If the context contains relevant information, prioritize it and do not contradict it. If the context does not contain the answer, you may use your general knowledge for questions about Honda, automobiles, driving, maintenance, and other closely related automotive topics. Do not invent or present unverified information as an official Honda Atlas Pakistan fact, especially for prices, policies, availability, specifications, or other potentially time-sensitive information. If you cannot reliably answer a Honda Atlas Pakistan-specific question, politely say that you don't have that information.

5. IMPORTANT FORMATTING: When asked to provide a table, YOU MUST format it as a valid Markdown table with proper newlines. DO NOT put the entire table on a single line. Every row must be on a new line.

KNOWLEDGE BASE CONTEXT:

${context}`,

            messages: convertMessages(messages),
        })

        result.pipeUIMessageStreamToResponse(res).catch(error => {
            console.error('Stream processing error:', error.message)
        })

    } catch (error) {
        console.error('Chat API error:', error)

        if (!res.headersSent) {
            res.status(500).json({
                error: 'Something went wrong. Please try again.',
            })
        }
    }
}