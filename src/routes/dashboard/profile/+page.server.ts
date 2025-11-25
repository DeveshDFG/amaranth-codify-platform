import { redirect } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
import prisma from "$lib/server/prisma";
import fs from "fs/promises";
import path from "path";

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user || !locals.session) {
    throw redirect(303, "/sign-in");
  }

  const dbUser = (await prisma.user.findUnique({
    where: { id: locals.user.id },
  })) as any;

  const source = dbUser ?? locals.user;

  const user = {
    id: source.id ?? null,
    username: source.username ?? source.displayUsername ?? "",
    email: source.email ?? "",
    name: source.name ?? source.username ?? "",
    bio: source.bio ?? "",
    location: source.location ?? "",
    interests: Array.isArray(source.interests)
      ? source.interests
      : typeof source.interests === "string" && source.interests.length
        ? source.interests
            .split(",")
            .map((s: string) => s.trim())
            .filter(Boolean)
        : [""],
    avatar: source.avatar ?? source.image ?? null,
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

      let avatarUrl: string | undefined;
      try {
        const avatarField = form.get("avatar");
        if (
          avatarField &&
          (avatarField as any).size &&
          typeof (avatarField as any).arrayBuffer === "function"
        ) {
          const avatarFile: any = avatarField;
          const originalName = path.basename(avatarFile.name || "avatar");
          const safeName = originalName.replace(/[^a-zA-Z0-9._-]/g, "_");
          const filename = `${locals.user.id}-${Date.now()}-${safeName}`;
          const uploadsDir = path.join(process.cwd(), "static", "uploads");
          await fs.mkdir(uploadsDir, { recursive: true });
          const filePath = path.join(uploadsDir, filename);
          const buffer = Buffer.from(await avatarFile.arrayBuffer());
          await fs.writeFile(filePath, buffer);
          avatarUrl = `/uploads/${filename}`;
        }
      } catch (uploadErr) {
        console.error("avatar upload failed:", uploadErr);
        avatarUrl = undefined;
      }
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
      if (avatarUrl) updateData.avatar = avatarUrl;

      await prisma.user.update({
        where: { id: locals.user.id },
        data: updateData,
      });
      const updated = (await prisma.user.findUnique({
        where: { id: locals.user.id },
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
