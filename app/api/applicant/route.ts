import { db } from "@/lib/db";
import * as schema from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const users = await db.select().from(schema.users).where(eq(schema.users.role, "user"));

        if (!users) {
            return NextResponse.json({ message: "No user found!", status: 404 });
        }

        return NextResponse.json({ users, status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error", status: 500 });
    }
}
