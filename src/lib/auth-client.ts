import { createAuthClient } from "better-auth/svelte";

export const authClient = createAuthClient();

export const signInGoogle = async () => {
  await authClient.signIn.social({ provider: "google" });
};
