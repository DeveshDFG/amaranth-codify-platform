import { auth } from "$lib/server";
import { isValidEmail, isValidPassword, isValidUsername } from "$lib/string";
import type { Actions } from "./$types";

export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      typeof username !== "string"
    ) {
      return { success: false, message: "Invalid form data" };
    }

    if (!isValidEmail(email)) {
      return { success: false, message: "Invalid email format" };
    }
    if (!isValidUsername(username)) {
      return { success: false, message: "Invalid username format" };
    }
    if (!isValidPassword(password)) {
      return { success: false, message: "Invalid password format" };
    }

    try {
      await auth.api.signUpEmail({
        body: { email, password, name: username, username },
      });
    } catch (e: any) {
      return { success: false, message: e.body.message as string };
    }
    return { success: true };
  },
} satisfies Actions;
