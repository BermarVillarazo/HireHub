import { db } from "@/lib/db";
import * as schema from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import validator from "validator";
import { z } from "zod";

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

// ZOD schema for applicant data validation
const applicantSchema = z.object({
    first_Name: z
        .string()
        .min(2, { message: "First Name must have 2 or more characters" })
        .max(75, { message: "First Name must have 75 or less characters" }),
    last_Name: z
        .string()
        .min(2, { message: "Last Name must have 2 or more characters" })
        .max(75, { message: "Last Name must have 75 or less characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    contactNumber: z.string().refine((value) => validator.isMobilePhone(value, "en-PH"), {
        message: "Invalid mobile phone number",
    }),
    communication: z.enum(["Email", "PhoneNumber"]),
    position: z.enum(["teachingStaff", "non-teachingStaff"]),
    resume: z.string(),
});

// Infer the type of the applicantSchema
type applicantSchemaProps = z.infer<typeof applicantSchema>;

export async function POST(request: NextRequest) {
    try {
        const data: applicantSchemaProps = await request.json();
        // Client validation
        const validationResult = applicantSchema.safeParse(data);
        // Client validation
        if (!validationResult.success) {
            console.log(validationResult.error.issues);
            return NextResponse.json(validationResult.error.issues, { status: 409 });
        }
        // Database email validation if there is existing email
        const existingApplicant = await db
            .select()
            .from(schema.applicant)
            .where(eq(schema.applicant.email, data.email));
        // Database email validation if there is existing email
        if (existingApplicant.length > 0) {
            return NextResponse.json(
                {
                    message: "Email already exists. Please use a different email.",
                    status: 409,
                },
                { status: 409 }
            );
        }
        // Applicant data insertion if no existing email, and client validation is successful
        await db.insert(schema.applicant).values({
            ...data,
            contactNumber: parseInt(data.contactNumber),
        });

        return NextResponse.json({ data, status: 200 }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error", status: 500 },
            { status: 500 }
        );
    }
}
