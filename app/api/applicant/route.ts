import { db } from "@/lib/db";
import * as schema from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const users = await db.select().from(schema.users).where(eq(schema.users.role, "user"));
        return NextResponse.json(users);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error }, { status: 500 });
    }
}

// export async function PUT(request: Request) {
//     const body = request.body;
//     console.log(body);
//     return NextResponse.json({ body });
// }
