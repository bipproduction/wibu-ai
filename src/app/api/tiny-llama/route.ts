import { aiHandler } from "@/lib/ai_handler";

export async function POST(req: Request) {
  const { messages } = await req.json();
  if (!messages) return new Response("Missing messages", { status: 400 });
  const result = await aiHandler("tinyllama", messages);
  if (!result) return new Response("data not processed", { status: 400 });
  return new Response(result);
}
