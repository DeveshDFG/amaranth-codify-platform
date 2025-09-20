import { type Handle, redirect } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { svelteKitHandler } from "better-auth/svelte-kit";
import { building } from "$app/environment";
import { auth } from "$lib/auth";

/**
 * Automatically set the locals of the request if there is a session detected
 */
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

/**
 * If the user is authenticated and tries to access the sign-in or sign-up page
 * when they are already signed in, we should immediately redirect them to the
 * home page.
 */
const redirectIfAuthenticated: Handle = async ({ event, resolve }) => {
  if (event.url.pathname === "/sign-in" || event.url.pathname === "/sign-up") {
    if (event.locals.user && event.locals.session) {
      return redirect(303, "/");
    }
  }
  return resolve(event);
};

// Add more handles here if needed, in the order you want them to run
export const handle = sequence(authHandle, redirectIfAuthenticated);
