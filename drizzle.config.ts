// import type { Config } from "drizzle-kit";

// export default {
//     out: "./.drizzle",
//     schema: "./lib/schema.ts",
//     breakpoints: true,
//     driver: "pg",
//     dbCredentials: {
//         connectionString: process.env.POSTGRES_URL!,
//     },
// } satisfies Config;

import { loadEnvConfig } from "@next/env";
import type { Config } from "drizzle-kit";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

let connectionString;

if (process.env.VERCEL_ENV === "production") {
    connectionString = process.env.POSTGRES_URL;
} else if (process.env.VERCEL_ENV === "preview") {
    connectionString = process.env.POSTGRES_URL;
} else if (process.env.VERCEL_ENV === "development") {
    connectionString = process.env.POSTGRES_URL;
}

export default {
    out: "./.drizzle",
    schema: "./lib/schema.ts",
    breakpoints: true,
    driver: "pg",
    dbCredentials: {
        connectionString: connectionString ? connectionString + "?sslmode=require" : "",
    },
} satisfies Config;
