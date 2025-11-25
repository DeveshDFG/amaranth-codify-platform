import prisma from "$lib/server/prisma.js";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  const meetings = await prisma.meeting.findMany({
    orderBy: { startAt: "asc" },
  });
  //if we have different admins this may be useful
  //include: {createdBy: {select: {id: true, name: true, email: true}}}});

  return { user: locals.user ?? null, meetings };
};
