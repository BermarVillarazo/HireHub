import { db } from "@/lib/db";
import * as schema from "@/lib/schema";
import { NextRequest, NextResponse } from "next/server";

export const dyanmic = "force-dynamic";

export async function GET(request: NextRequest) {
    try {
        const status = await db.select().from(schema.rating);
        return NextResponse.json({ status }, { status: 200 });
    } catch (error) {
        console.log("Error fetching status:", error);
        return NextResponse.json(
            { message: "Internal Server Error", status: 500 },
            { status: 500 }
        );
    }
}
