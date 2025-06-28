import { NextResponse } from "next/server";
import Groq from "groq-sdk";
const systemPrompt='you are an inventory bot and tell recipes and about the website. the website contains inventory items, users can add or remove items from it. items can be added manually by writing text or using image classification. currently, model can only classify into two categories bananas and bottles'

const client= new Groq({apiKey:process.env.GROQ_API_KEY})

export async function POST(req){
    const { messages } = await req.json();

    // const data = await req.json();

    try{
        const response = await client.chat.completions.create({
  messages: [
    { role: "system", content: systemPrompt },
    ...messages,
  ],
  model: "llama3-8b-8192",
  stream: false,
});

        const responseText= response.choices[0]?.message?.content || 'No response found';

        return NextResponse.json({assistantMessage:responseText})
    }catch (err) {
    console.error("API Error:", err); // Log full error to terminal
    return NextResponse.json(
      { error: "Internal Server Error", detail: err.message || err.toString() },
      { status: 500 }
    );
  }


}