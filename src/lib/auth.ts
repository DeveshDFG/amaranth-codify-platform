import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { sveltekitCookies } from "better-auth/svelte-kit";
import { username } from "better-auth/plugins/username";
import { getRequestEvent } from "$app/server";
import prisma from "./prisma";

export const auth = betterAuth({
  plugins: [username(), sveltekitCookies(getRequestEvent)], // sveltekitCookies should always be last
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      prompt: "select_account",
      newUserCallbackUrl: "/",
    },
  },
});
