# Honda AI Chatbot (Hobot)

A portfolio-grade AI chatbot built as a conceptual customer service assistant for the Honda Atlas Pakistan website. This project demonstrates full-stack AI integration, prompt engineering, and modern React development.

## Overview

"Hobot" is designed to act as the official corporate assistant for Honda Atlas Pakistan. It answers customer inquiries regarding cars, services, and corporate information while strictly maintaining a professional persona through advanced prompt engineering and system guardrails.

## Tech Stack

- **Frontend:** React + Vite (Vanilla CSS, no Tailwind)
- **Backend:** Node.js + Express
- **AI Integration:** Vercel AI SDK v7
- **LLM Provider:** Google Gemini API (`gemini-3-flash-preview`)
- **Vector Database:** Pinecone (for RAG / Knowledge Base)

## Features (Current Progress)

- **Real-Time Streaming:** Responses stream in real-time chunk-by-chunk using the Vercel AI SDK `useChat` hook and `pipeUIMessageStreamToResponse`.
- **Prompt Guardrails:** The bot is strictly constrained to only discuss automotive and Honda-related topics, politely refusing out-of-scope requests (like recipes or coding).
- **RAG Architecture:** Fully implemented Retrieval-Augmented Generation using Pinecone. The bot dynamically searches a vector database of Honda FAQs and grounds its answers in real company data.

## Local Setup

1. **Clone the repository**
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up Environment Variables:**
   Create a `.env` file in the root directory and add your Google Gemini and Pinecone API keys:
   ```env
   GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key_here
   PINECONE_API_KEY=your_pinecone_api_key_here
   ```
4. **Run the Development Server:**
   You will need to run the frontend and backend simultaneously.
   
   *Terminal 1 (Backend):*
   ```bash
   node server.js
   ```
   *Terminal 2 (Frontend):*
   ```bash
   npm run dev
   ```

*Disclaimer: This is a learning/portfolio project and is not officially affiliated with Honda Atlas Pakistan.*
