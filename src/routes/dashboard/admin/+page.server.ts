import prisma from "$lib/server/prisma.js";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const users = await prisma.user.findMany();
  return {
    users,
  };
};
