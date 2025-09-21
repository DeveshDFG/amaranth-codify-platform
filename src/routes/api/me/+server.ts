import type { RequestHandler } from "@sveltejs/kit";

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
