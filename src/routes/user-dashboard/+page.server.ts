import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const userProfile = {
    name: "John Doe",
    bio: "Software Developer",
    location: "San Francisco, CA",
    interests: ["Coding", "Hiking", "Photography"],
  };
  return {
    user: userProfile,
  };
};
