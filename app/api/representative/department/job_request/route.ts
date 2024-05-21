import { db } from "@/lib/db";
import * as schema from "@/lib/schema";
import { eq, ne } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    try {
        const jobRequest = await db.select().from(schema.jobRequest).where(ne(schema.jobRequest.departmentName, "empty"));

        return NextResponse.json({ jobRequest: jobRequest });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Internal Server Error", status: 500 },
            { status: 500 }
        );
    }
}
