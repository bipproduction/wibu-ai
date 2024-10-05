const availableTasks = ["chat", "generate"];
export async function POST(
  req: Request,
  { params }: { params: { task: "chat" | "generate" } }
) {
  if (!availableTasks.includes(params.task))
    return new Response("Task not available", { status: 400 });
  try {
    const body = await req.json();
    const res = await fetch(`http://localhost:11434/api/${params.task}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
    return new Response(res.body);
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
