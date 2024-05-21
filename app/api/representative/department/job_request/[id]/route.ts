import { db } from "@/lib/db";
import * as schema from "@/lib/schema";
import { ParamsIdProps } from "@/types/type";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

type ParamsNameProps = {
    params: {
        name: string;
    };
};

export async function GET(request: NextRequest, { params }: ParamsIdProps) {
    try {
        const { id } = params;
        const jobRequest = await db
            .select()
            .from(schema.jobRequest)
            .where(eq(schema.jobRequest.request_id, id));

        return NextResponse.json({ jobRequest });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Internal Server Error", status: 500 },
            { status: 500 }
        );
    }
}
