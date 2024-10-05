import prisma from "@/lib/prisma";
import _ from "lodash";

const waUrl = "https://wa.wibudev.com/code";
const waPath = ({ nom, text }: { nom: string; text: string }) => {
  return `${waUrl}?nom=${nom}&text=${text}`;
};
export async function POST(
  request: Request,
  { params }: { params: { phone: string } }
) {
  const code = _.random(1000, 9999).toString();

  const send = await fetch(waPath({ nom:  params.phone, text: code }));

  if (!send.ok) {
    return new Response(JSON.stringify({ send }), { status: 500 });
  }

  if (send.status !== 200) {
    return new Response(JSON.stringify({ send }), { status: 500 });
  }

  const { id } = await send.json();

  if (!id) {
    return new Response(JSON.stringify({ send }), { status: 500 });
  }

  const createCode = await prisma.pinCode.upsert({
    where: {
      id
    },
    create: {
      id,
      phone: params.phone,
      code
    },
    update: {
      code
    }
  });

  return new Response(JSON.stringify({ createCode }), { status: 200 });
}
