import { db } from "@/lib/db";
import * as schema from "@/lib/schema";
import { isNotNull } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const departmentUsers = await db
            .select()
            .from(schema.users)
            .where(isNotNull(schema.users.departmentName));

        return NextResponse.json({ departmentUsers }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
