import { authClient } from "../src/lib";
import { UserRole } from "../src/lib/types/user-role";

const { data, error } = await authClient.signUp.email({
  email: process.env.DEFAULT_ADMIN_EMAIL!,
  password: process.env.DEFAULT_ADMIN_PASSWORD!,
  name: process.env.DEFAULT_ADMIN_NAME!,
  role: UserRole.ADMIN,
});
