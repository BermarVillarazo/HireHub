import { db } from "@/lib/db";
import * as schema from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        const user = await db.select().from(schema.users).where(eq(schema.users.id, id));
        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error", status: 500 },
            { status: 500 }
        );
    }
}
