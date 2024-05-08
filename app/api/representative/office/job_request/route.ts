import { jobRequestSchema, jobRequestSchemaProps } from "@/app/types/type";
import { db } from "@/lib/db";
import * as schema from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(response: NextResponse, request: NextRequest) {
    try {
        const result = await db.query.jobRequest.findFirst({
            with: {
                office: true,
            },
        });
        return NextResponse.json({ result: result?.office });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Internal Server Error", status: 500 },
            { status: 500 }
        );
    }
}

export async function POST(response: NextResponse, request: Request) {
    try {
        const data: jobRequestSchemaProps = await request.json();
        const validationResult = jobRequestSchema.safeParse(data);
        let officeId;

        if (!validationResult.success) {
            return NextResponse.json(validationResult.error.issues, { status: 409 });
        }

        const requestExist = await db
            .select()
            .from(schema.jobRequest)
            .where(eq(schema.jobRequest.requested_position, data.requested_position));

        if (requestExist.length > 0) {
            return NextResponse.json(
                {
                    message:
                        "Job request for that position already exists please create a new request.",
                    status: 409,
                },
                { status: 409 }
            );
        }

        const officeName = await db
            .select()
            .from(schema.office)
            .where(eq(schema.office.office_name, data.officeName));

        officeName.forEach(({ office_id }) => {
            officeId = office_id;
        });

        await db.insert(schema.jobRequest).values({
            ...data,
            officeId: officeId,
        });

        return NextResponse.json({ data }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Internal Server Error", status: 500 },
            { status: 500 }
        );
    }
}
