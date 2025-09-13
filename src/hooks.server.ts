import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { svelteKitHandler } from "better-auth/svelte-kit";
import type { CarbonTheme } from "carbon-components-svelte/src/Theme/Theme.svelte";
import { building } from "$app/environment";
import { auth } from "$lib/auth";

const authHandle: Handle = async ({ event, resolve }) => {
  const session = await auth.api.getSession({
    headers: event.request.headers,
  });
  if (session) {
    event.locals.session = session.session;
    event.locals.user = session.user;
  }
  return svelteKitHandler({ event, resolve, auth, building });
};

export const handle = sequence(authHandle);
