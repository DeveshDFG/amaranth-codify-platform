import prisma from "$lib/server/prisma.js";
import { error, fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, locals }) => {
  const users = await prisma.user.findMany();
  return {
    users,
    user: locals.user ?? null
  };
};

export const actions = {
  "create-meeting": async ({ locals, request }) => {
    const user = locals.user;
		if (!user) {
			throw error(401, "You must be logged in to create a meeting");
		}

    const formData = await request.formData();
    const title = formData.get("title")?.toString().trim();
    const date = formData.get("date")?.toString();
    const time = formData.get("time")?.toString();

    if (!title || !date || !time) {
			return fail(400, {message: "Title, date, and time are required"});
		}

    // TODO: replace with actual meeting creation logic
    const startAt = new Date(`${date}T${time}:00Z`);
    const meeting = await prisma.meeting.create({data: {title, startAt, createdById: user.id}});
    return {success: true, meetingId: meeting.id};
  },
};
