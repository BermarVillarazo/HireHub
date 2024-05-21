import { db } from "@/lib/db";
import * as schema from "@/lib/schema";
import { ParamsNameProps } from "@/types/type";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: ParamsNameProps) {
    try {
        const { name } = params;

        const departmentRequests = await db
            .select()
            .from(schema.jobRequest)
            .where(eq(schema.jobRequest.departmentName, name));

        return NextResponse.json({ departmentRequests }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error", status: 500 });
    }
}
