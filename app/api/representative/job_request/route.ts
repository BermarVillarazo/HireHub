import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import * as schema from "@/lib/schema";

export async function GET(request: NextRequest) {
    try {
        const jobRequest = await db
            .select()
            .from(schema.department)

        return NextResponse.json({ result: jobRequest });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Internal Server Error", status: 500 },
            { status: 500 }
        );
    }
}