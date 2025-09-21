import type { RequestHandler } from "@sveltejs/kit";

/**
 * Get the currently authenticated user.
 * If no user is authenticated, return a 401 error.
 * If a user is authenticated, return the user object.
 *
 * If you only need the User object from better-auth, consider using the authClient instead.
 *
 * TODO: In the future, this route should return the user's profile information as well. Otherwise, this route is redundant.
 */
export const GET: RequestHandler = async ({ locals }) => {
  if (!locals.user) {
    return new Response("", {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
  const { user } = locals;
  return new Response(JSON.stringify(user), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
