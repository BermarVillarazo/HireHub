import { db } from "@/lib/db";
import * as schema from "@/lib/schema";
import { isNotNull } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const officeUsers = await db
            .select()
            .from(schema.users)
            .where(isNotNull(schema.users.officeName));

        return NextResponse.json({ officeUsers }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
