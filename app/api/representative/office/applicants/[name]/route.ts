import { ParamsNameProps } from "@/app/types/type";
import { db } from "@/lib/db";
import * as schema from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: ParamsNameProps) {
    try {
        const { name } = params;
        const applicants = await db
            .select()
            .from(schema.applicant)
            .where(eq(schema.applicant.officeName, name));

        return NextResponse.json({ applicants }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error", status: 500 });
    }
}
