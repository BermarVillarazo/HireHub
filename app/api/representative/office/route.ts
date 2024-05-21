import { db } from "@/lib/db";
import * as schema from "@/lib/schema";
import { ne } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    try {
        const officeJobRequests = await db
            .select()
            .from(schema.jobRequest)
            .where(ne(schema.jobRequest.officeName, "empty"));

        return NextResponse.json({ officeJobRequests }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error", status: 500 });
    }
}
