/* eslint-disable @typescript-eslint/no-explicit-any */
export async function aiHandler(model: string, messages: any[]) {
  const res = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: model,
      messages: messages,
      stream: false
    })
  });
  return res.body;
}
