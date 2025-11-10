import prisma from "$lib/server/prisma.js";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const users = await prisma.user.findMany();
  return {
    users,
  };
};

export const actions = {
  "create-meeting": async ({ request }) => {
    const formData = await request.formData();
    const title = formData.get("title");
    const date = formData.get("date");
    const time = formData.get("time");

    // TODO: replace with actual meeting creation logic
    console.log(
      "Creating meeting with title:",
      title,
      "date:",
      date,
      "time:",
      time,
    );

    const meetingId = 0; // Replace with actual meeting creation logic
    return { success: true, meetingId };
  },
};
