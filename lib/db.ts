import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";

import { eq } from "drizzle-orm";
import * as schema from "./schema";

export const db = drizzle(sql, { schema });

export function getUsers() {
    const getAllUsers = db.select().from(schema.users).where(eq(schema.users.role, "user"));
    return getAllUsers;
}

export function getRecruiters() {
    const getAllRecruiters = db.select().from(schema.users).where(eq(schema.users.role, "recruiter"));
    return getAllRecruiters;
}
