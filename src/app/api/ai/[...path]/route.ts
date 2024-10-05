/* eslint-disable @typescript-eslint/no-explicit-any */
import { userVerify } from "@/lib/user_verify";

function iteratorToStream(iterator: any) {
  return new ReadableStream({
    async pull(controller) {
      try {
        const { value, done } = await iterator.next();

        if (done) {
          controller.close();
        } else {
          controller.enqueue(value);
        }
      } catch (err) {
        console.error("Error in stream:", err);
        controller.error(err); // Memberikan error pada controller
      }
    }
  });
}

// const decoder = new TextDecoder();

async function* makeIterator(res: Response) {
  const reader = res.body?.getReader();
  if (!reader) throw new Error("Response body is null or undefined");

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    yield value; // Tidak perlu di-encode ulang karena `value` sudah dalam bentuk Uint8Array
  }
}

export const POST = async (
  req: Request,
  { params }: { params: { path: string[] } }
) =>
  userVerify(req, async () => {
    const body = await req.json();
    console.log(body);

    if (!body.model || !body.prompt)
      return new Response("Missing Model or Prompt", { status: 400 });

    const res = await fetch("http://localhost:11434/" + params.path.join("/"), {
      method: "POST",
      body: JSON.stringify({ ...body })
    });

    if (!res.ok) {
      return new Response("Error fetching data", { status: res.status });
    }

    const iterator = makeIterator(res);
    const stream = iteratorToStream(iterator);

    return new Response(stream);
  });
