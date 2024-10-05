import prisma from "@/lib/prisma";
import { sessionCreate } from "wibu";
import dotenv from "dotenv";
import { wibuConfig } from "@/lib/wibu_config";
dotenv.config();
const WIBU_ENCODED_KEY = process.env.WIBU_ENCODED_KEY!;

export async function POST(
  request: Request,
  { params }: { params: { phone: string; code: string } }
) {
  const findCode = await prisma.pinCode.findFirst({
    where: {
      phone: params.phone,
      code: params.code
    }
  });

  if (!findCode) {
    return new Response(
      JSON.stringify({ success: false, message: "Code not found" }),
      { status: 500 }
    );
  }

  const userCreate = await prisma.user.upsert({
    where: {
      phone: findCode.phone
    },
    update: {
      phone: params.phone
    },
    create: {
      phone: params.phone
    },
    select: {
      id: true,
      name: true,
      phone: true
    }
  });

  const session = await sessionCreate({
    user: userCreate,
    encodedKey: WIBU_ENCODED_KEY,
    exp: "7 year",
    sessionKey: wibuConfig.wibuSessionKey
  });

  return new Response(JSON.stringify({ session }), { status: 200 });
}
