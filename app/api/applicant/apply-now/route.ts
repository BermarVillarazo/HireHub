import { db } from "@/lib/db";
import * as schema from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const applicants = await db.select().from(schema.applicant);

        if (!applicants) {
            return NextResponse.json(
                { message: "No applicant found!", status: 404 },
                { status: 404 }
            );
        }

        return NextResponse.json({ applicants, status: 200 }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error", status: 500 },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const {
            first_Name,
            last_Name,
            email,
            contactNumber,
            communication,
            position,
            resume,
        }: schema.applicants = await request.json();

        if (
            !first_Name ||
            !last_Name ||
            !email ||
            !contactNumber ||
            !communication ||
            !position ||
            !resume
        ) {
            return NextResponse.json(
                { message: "Please input all fields", status: 400 },
                { status: 400 }
            );
        }

        const existingApplicant = await db
            .select()
            .from(schema.applicant)
            .where(eq(schema.applicant.email, email));

        if (existingApplicant) {
            return NextResponse.json(
                {
                    message: "Email already exists. Please use a different email.",
                    status: 409,
                },
                { status: 409 }
            );
        }

        await db.insert(schema.applicant).values({
            first_Name,
            last_Name,
            email,
            contactNumber,
            resume,
            communication,
            position,
        });

        return NextResponse.json({
            first_Name,
            last_Name,
            email,
            contactNumber,
            communication,
            position,
            resume,
            status: 200,
        });
    } catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error", status: 500 },
            { status: 500 }
        );
    }
}
