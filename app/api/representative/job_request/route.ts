import { db } from "@/lib/db";
import * as schema from "@/lib/schema";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    try {
        const jobRequest = await db.select().from(schema.department);
        return NextResponse.json({ jobRequest }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
