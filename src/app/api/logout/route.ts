import { wibuConfig } from "@/lib/wibu_config";
import { sessionDelete } from "wibu";
export async function POST() {
  sessionDelete({
    sessionKey: wibuConfig.wibuSessionKey
  });
  return new Response(null, {
    status: 200,
    headers: {
      "Set-Cookie": `${wibuConfig.wibuSessionKey}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`
    }
  });
}
