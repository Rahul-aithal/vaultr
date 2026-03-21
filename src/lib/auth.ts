import { db } from "@/db/drizzle"; // your drizzle instance
import * as schema from "@/db/schema"; // 👈 wildcard import here
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
        schema:schema,
    }),
    socialProviders: {
        github: {
          clientId: process.env.GITHUB_CLIENT_ID as string,
          clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        },
      },
});
