import { loadEnvConfig } from "@next/env";
import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { cwd } from "process";
import * as schema from "./schema";

loadEnvConfig(cwd());

export const db = drizzle(sql, { schema });

// console.log("db url: ", process.env.POSTGRES_URL);
