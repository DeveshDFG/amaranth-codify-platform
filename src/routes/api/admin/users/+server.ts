import prisma from "$lib/server/prisma";
import type { RequestHandler } from "../../me/$types";

export const GET: RequestHandler = async () => {
  const users = await prisma.user.findMany();
  return new Response(JSON.stringify(users), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
