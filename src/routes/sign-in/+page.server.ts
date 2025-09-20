import { redirect } from "@sveltejs/kit";
import { auth } from "$lib";
import type { Actions } from "./$types";

export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");

    if (typeof email !== "string" || typeof password !== "string") {
      return { success: false, message: "Invalid form data" };
    }

    try {
      await auth.api.signInEmail({
        body: { email, password },
      });
    } catch (e: any) {
      return { success: false, message: e.body.message as string };
    }
    return redirect(303, "/");
  },
} satisfies Actions;
