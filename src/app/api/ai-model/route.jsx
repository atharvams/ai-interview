import OpenAI from "openai";

export async function POST() {
  const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: "${API_KEY_REF}",
  });
}
