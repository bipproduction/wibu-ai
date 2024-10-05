/* eslint-disable @typescript-eslint/no-explicit-any */
import { decrypt } from "wibu";
import prisma from "./prisma";
import dotenv from "dotenv";
dotenv.config();
const WIBU_ENCODED_KEY = process.env.WIBU_ENCODED_KEY!;

export async function userVerify(
  req: Request,
  onUser: (user: Record<string, any>) => Promise<Response>
) {
  const header = req.headers.get("authorization");
  if (!header) {
    return new Response("Unauthorized", {
      status: 401
    });
  }
  const token = header.split(" ")[1];
  if (!token) {
    return new Response("Unauthorized", {
      status: 401
    });
  }
  const userDecrypt = await decrypt({
    encodedKey: WIBU_ENCODED_KEY,
    token
  });

  if (!userDecrypt) {
    return new Response("Unauthorized", {
      status: 401
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userDecrypt!.id
    },
    select: {
      id: true,
      phone: true,
      name: true,
      email: true
    }
  });

  if (!user) {
    return new Response("Unauthorized", {
      status: 401
    });
  }

  return onUser(user);
}
