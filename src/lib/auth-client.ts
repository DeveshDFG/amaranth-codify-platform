import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/svelte";
import type { auth } from "./server";

export const authClient = createAuthClient({
  plugins: [inferAdditionalFields<typeof auth>()],
});

export const signInGoogle = async () => {
  await authClient.signIn.social({ provider: "google" });
};
