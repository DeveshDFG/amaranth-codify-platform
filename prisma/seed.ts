import { authClient } from "../src/lib";

const { data, error } = await authClient.signUp.email({
  email: process.env.DEFAULT_ADMIN_EMAIL!,
  password: process.env.DEFAULT_ADMIN_PASSWORD!,
  name: process.env.DEFAULT_ADMIN_NAME!,
});
