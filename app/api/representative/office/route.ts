import { db } from "@/lib/db";
import * as schema from "@/lib/schema";
import { ne } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const officeRequests = await db
            .select()
            .from(schema.jobRequest)
            .where(ne(schema.jobRequest.departmentName, "empty"));

        return NextResponse.json({ officeRequests }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error", status: 500 });
    }
}
