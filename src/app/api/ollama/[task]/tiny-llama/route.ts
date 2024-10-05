import { aiHandler } from "@/lib/ai_handler";

export async function POST(
  req: Request,
  { params }: { params: { task: "chat" | "generate" } }
) {
  try {
    const { data } = await req.json();
    const result = await aiHandler("tinyllama", params.task, data);
    return new Response(result);
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
