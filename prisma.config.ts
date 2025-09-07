import path from "node:path";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: path.join(process.cwd(), "prisma/schema/"),
  migrations: {
    seed: "pnpm run db:seed",
  },
});
