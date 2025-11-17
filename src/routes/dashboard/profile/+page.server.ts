import { redirect } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
import prisma from "$lib/server/prisma";

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user || !locals.session) {
    throw redirect(303, "/sign-in");
  }

  const dbUser = (await prisma.user.findUnique({
    where: { id: locals.user.id },
    select: {
      id: true,
      username: true,
      email: true,
      name: true,
      image: true,
    },
  })) as any;

  const source = dbUser ?? locals.user;

  const user = {
    id: source.id ?? null,
    username: source.username ?? source.displayUsername ?? "",
    email: source.email ?? "",
    name: source.name ?? source.username ?? "",
    bio: source.bio ?? "Software Developer",
    location: source.location ?? "",
    interests: Array.isArray(source.interests)
      ? source.interests
      : typeof source.interests === "string" && source.interests.length
        ? source.interests
            .split(",")
            .map((s: string) => s.trim())
            .filter(Boolean)
        : ["Coding", "Hiking", "Photography"],
    avatar:
      source.avatar ??
      source.image ??
      "https://img.freepik.com/premium-photo/male-female-profile-avatar-user-avatars-gender-icons_1020867-75355.jpg",
  };

  return { user };
};

export const actions: Actions = {
  updateProfile: async ({ request, locals }) => {
    if (!locals.user) {
      return { success: false, message: "Not authenticated" };
    }

    try {
      const form = await request.formData();
      const name = (form.get("name") as string) ?? "";
      const bio = (form.get("bio") as string) ?? "";
      const location = (form.get("location") as string) ?? "";
      const interestsRaw = (form.get("interests") as string) ?? "";
      const interests = interestsRaw
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const updateData: any = {
        name: name || undefined,
        bio: bio || undefined,
        location: location || undefined,
        interests,
      };

      const updated = (await prisma.user.update({
        where: { id: locals.user.id },
        data: updateData,
        select: {
          id: true,
          username: true,
          email: true,
          name: true,
          image: true,
        },
      })) as any;

      const responseUser = {
        id: updated.id,
        username: updated.username ?? updated.displayUsername ?? "",
        email: updated.email ?? "",
        name: updated.name ?? "",
        bio: (updated as any).bio ?? "",
        location: (updated as any).location ?? "",
        interests: (updated as any).interests ?? [],
        avatar: (updated as any).avatar ?? updated.image ?? null,
      };

      return { success: true, user: responseUser };
    } catch (e: any) {
      return {
        success: false,
        message: e?.message ?? "Failed to update profile",
      };
    }
  },
};
