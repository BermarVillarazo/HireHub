import { jobRequestSchema, jobRequestSchemaProps } from "@/app/types/type";
import { db } from "@/lib/db";
import * as schema from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(response: NextResponse, request: NextRequest) {
    try {
        const result = await db.query.jobRequest.findFirst({
            with: {
                department: true,
            },
        });
        return NextResponse.json({ result: result?.department });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Internal Server Error", status: 500 },
            { status: 500 }
        );
    }
}

