import { redirect } from "@sveltejs/kit";
import { auth } from "$lib";
import type { Actions } from "./$types";

export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const emailOrUsername = formData.get("emailOrUsername");
    const password = formData.get("password");

    if (typeof emailOrUsername !== "string" || typeof password !== "string") {
      return { success: false, message: "Invalid form data" };
    }

    if (emailOrUsername.includes("@")) {
      try {
        await auth.api.signInEmail({
          body: { email: emailOrUsername, password },
        });
      } catch (e: any) {
        return { success: false, message: e.body.message as string };
      }
    } else {
      try {
        await auth.api.signInUsername({
          body: { username: emailOrUsername, password },
        });
      } catch (e: any) {
        return {
          success: false,
          message: e.body.message as string,
        };
      }
    }

    return redirect(303, "/");
  },
} satisfies Actions;
