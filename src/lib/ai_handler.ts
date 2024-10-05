/* eslint-disable @typescript-eslint/no-explicit-any */
export async function aiHandler(
  model: string,
  task: "chat" | "generate" = "chat",
  data: any
) {
  let append = {};
  if (task === "chat") {
    append = {
      messages: data.messages
    };
  } else if (task === "generate") {
    append = {
      prompt: data.prompt
    };
  }

  const res = await fetch(`http://localhost:11434/api/${task}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: model,
      stream: false,
      ...append
    })
  });
  return res.body;
}
