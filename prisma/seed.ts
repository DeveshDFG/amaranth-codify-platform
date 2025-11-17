import { authClient, randomString } from "../src/lib";
import { UserRole } from "../src/lib/types/user-role";

const { data, error } = await authClient.signUp.email({
  email: process.env.DEFAULT_ADMIN_EMAIL!,
  password: process.env.DEFAULT_ADMIN_PASSWORD!,
  name: process.env.DEFAULT_ADMIN_NAME!,
  role: UserRole.ADMIN,
});

const EMAIL_DOMAINS = [
  "gmail.com",
  "yahoo.com",
  "outlook.com",
  "hotmail.com",
  "aol.com",
  "icloud.com",
  "mail.com",
  "zoho.com",
  "yandex.com",
  "protonmail.com",
];

// 1000 dummy users
for (let i = 1; i <= 10; i++) {
  const username = randomString();
  await authClient.signUp.email({
    email: `${username}@${EMAIL_DOMAINS[Math.floor(Math.random() * EMAIL_DOMAINS.length)]}`,
    password: randomString(64),
    username,
    displayUsername: username,
    name: `User ${i}`,
    role: UserRole.USER,
  });
}
