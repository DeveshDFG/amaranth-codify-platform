import prisma from "$lib/server/prisma.js";
import { error, fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  const [users, meetings] = await Promise.all([
    prisma.user.findMany(),
    prisma.meeting.findMany({
      orderBy: { startAt: "asc" },
    }),
  ]);

  return {
    users,
    meetings,
    user: locals.user ?? null,
  };
};

export const actions: Actions = {
  "create-meeting": async ({ locals, request }) => {
    const user = locals.user;
    if (!user) {
      throw error(401, "You must be logged in to create a meeting");
    }

    const formData = await request.formData();
    const title = formData.get("title")?.toString().trim();
    const date = formData.get("date")?.toString();
    const time = formData.get("time")?.toString();
    const description =
      formData.get("description")?.toString().trim() || undefined;
    const rawLink = formData.get("link")?.toString().trim();
    let link: string | undefined = undefined;

    if (!title || !date || !time) {
      return fail(400, { message: "Title, date, and time are required" });
    }

    if (rawLink) {
      const httpsRegex = /^https:\/\/.+/i;
      if (!httpsRegex.test(rawLink)) {
        return fail(400, {
          message: "Meeting link must start with https://",
          values: { title, date, time, description, link: rawLink },
        });
      }
      link = rawLink;
    }

    const startAt = new Date(`${date}T${time}:00Z`);

    const meeting = await prisma.meeting.create({
      data: { title, description, link, startAt, createdById: user.id },
    });

    // after reload stay on create page and show "View meeting" notification
    throw redirect(
      303,
      `/dashboard/admin?tab=create&meeting=${encodeURIComponent(meeting.id)}`,
    );
  },

  "update-meeting": async ({ locals, request }) => {
    const user = locals.user;
    if (!user) throw error(401, "You must be logged in to update a meeting");

    const formData = await request.formData();
    const id = formData.get("id")?.toString();
    const title = formData.get("title")?.toString().trim();
    const startAtStr = formData.get("startAt")?.toString();
    const description =
      formData.get("description")?.toString().trim() || undefined;
    const rawLink = formData.get("link")?.toString().trim();
    let link: string | undefined = undefined;

    if (!id || !title || !startAtStr) {
      return fail(400, { message: "Id, title, and time are required" });
    }

    if (rawLink) {
      const httpsRegex = /^https:\/\/.+/i;
      if (!httpsRegex.test(rawLink)) {
        return fail(400, {
          message: "Meeting link must start with https://",
          values: {
            id,
            title,
            startAt: startAtStr,
            description,
            link: rawLink,
          },
        });
      }
      link = rawLink;
    }

    const startAt = new Date(startAtStr);

    await prisma.meeting.update({
      where: { id },
      data: { title, description, link, startAt },
    });

    // after edit, reload and stay on tab
    throw redirect(303, "/dashboard/admin?tab=manage");
  },

  "delete-meeting": async ({ locals, request }) => {
    const user = locals.user;
    if (!user) {
      throw error(401, "You must be logged in to delete a meeting");
    }

    const formData = await request.formData();
    const id = formData.get("id")?.toString();

    if (!id) {
      return fail(400, { message: "Meeting id is required" });
    }

    await prisma.meeting.delete({ where: { id } });

    // after delete, reload and stay on tab
    throw redirect(303, "/dashboard/admin?tab=manage");
  },
};
