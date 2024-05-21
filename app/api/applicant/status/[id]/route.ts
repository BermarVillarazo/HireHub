import { db } from "@/lib/db";
import * as schema from "@/lib/schema";
import { ParamsIdProps } from "@/types/type";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: ParamsIdProps) {
    try {
        const { id } = params;

        const applicant = await db
            .select()
            .from(schema.applicant)
            .where(eq(schema.applicant.id, id));

        const status = await db
            .select()
            .from(schema.rating)
            .where(eq(schema.rating.applicantId, id));

        return NextResponse.json({ status }, { status: 200 });
    } catch (error) {
        console.log("Error fetching status for applicant ID:", error);
        return NextResponse.json(
            { message: "Internal Server Error", status: 500 },
            { status: 500 }
        );
    }
}
