import fs from 'fs';
import dotenv from 'dotenv';
import { Pinecone } from '@pinecone-database/pinecone';
import { embedMany } from 'ai';
import { google } from '@ai-sdk/google';
import { clearScreenDown } from 'readline';

dotenv.config();

async function main() {
    console.log('Starting to seed');

    const pc = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY,
    });

    const index = pc.index('hobot-knowledge');

    const rawData = fs.readFileSync('./faq.json', 'utf8');
    const faqs = JSON.parse(rawData);

    const faqTexts = faqs.map(faq => faq.content);

    console.log(`Found ${faqs.length} FAQs. Generating embeddings`);

    const { embeddings } = await embedMany({
        model: google.textEmbeddingModel('gemini-embedding-2'),
        values: faqTexts,
    });

    const vectors = faqs.map((faq, i) => ({
        id: faq.id,
        values: embeddings[i],
        metadata: {
            text: faq.content,
            category: faq.category,
            model: faq.model,
            variant: faq.variant
        }
    }));

    console.log('Uploading to Pinecone');
    await index.upsert({ records: vectors });


    console.log('Done!.');
}

main().catch(console.error);