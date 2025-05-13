import OpenAI from "openai";
import { GoogleGenAI } from "@google/genai";
import { QuestionPrompt } from "@/services/constants";

const aiApiKey = process.env.NEXT_PUBLIC_GEMINI_API;

export async function POST(req) {
  const { jobPosition, jobDescription, interviewDuration, interviewType } =
    await req.json();
  const ai = new GoogleGenAI({ apiKey: aiApiKey });

  const FinalQuestionPrompt = QuestionPrompt.replace(
    "{{job Title}}",
    jobPosition
  )
    .replace("{{jobDescription}}", jobDescription)
    .replace("{{duration}}", interviewDuration + " min")
    .replace("{{type}}", interviewType);

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: FinalQuestionPrompt,
    });

    const filteredResponse = response.text
      .replace("```json", "")
      .replace("```", "");
    const jsonResponse = await JSON.parse(filteredResponse);
    console.log(jsonResponse);
    return Response.json(jsonResponse);
  } catch (error) {
    console.error(error);
  }
}
