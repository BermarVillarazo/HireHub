import { ParamsIdProps, statusSchema, statusSchemaProps } from "@/app/types/type";
import { db } from "@/lib/db";
import * as schema from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: ParamsIdProps) {
    try {
        const id = params.id;

        const applicant = await db
            .select()
            .from(schema.applicant)
            .where(eq(schema.applicant.id, id));

        return NextResponse.json(applicant, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error", status: 500 },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request, { params }: ParamsIdProps) {
    try {
        const id = params.id;

        const body: statusSchemaProps = await request.json();
        const validationResult = statusSchema.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json(validationResult.error.issues, { status: 409 });
        }

        const applicant = await db
            .select()
            .from(schema.applicant)
            .where(eq(schema.applicant.id, id));

        if (!applicant) {
            return NextResponse.json(
                { message: "Applicant not found", status: 404 },
                { status: 404 }
            );
        }

        const response = await db
            .update(schema.applicant)
            .set({ status: body.status })
            .where(eq(schema.applicant.id, id));

        const ApplicantRating = await db.insert(schema.rating).values({
            status_name: body.status,
            rating: body.rating,
            applicantId: id,
        });

        // const { command } = response;

        return NextResponse.json(
            {
                // command,
                message: "Status has been Updated",
                status: 200,
                applicant,
                // ApplicantRating
            },
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Internal Server Error", status: 500 },
            { status: 500 }
        );
    }
}
