import { ParamsNameProps } from "@/app/types/type";
import { db } from "@/lib/db";
import * as schema from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: ParamsNameProps) {
    try {
        const { name } = params;

        const officeRequests = await db
            .select()
            .from(schema.jobRequest)
            .where(eq(schema.jobRequest.officeName, name));

        return NextResponse.json({ officeRequests }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error", status: 500 });
    }
}
