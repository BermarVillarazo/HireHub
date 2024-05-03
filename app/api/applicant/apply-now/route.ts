import { db } from "@/lib/db";
import * as schema from "@/lib/schema";
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

<<<<<<< HEAD
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
=======
export async function POST(request: Request) {
>>>>>>> ac589baa8da441354b31270a69e1529e029d538d
    try {
        const { first_Name, last_Name, email, contactNumber, communication, position, resume } =
            await request.json();

        if (!first_Name || !last_Name || !email || !contactNumber || !communication || !position) {
            return NextResponse.json({ message: "Please input all fields", status: 400 });
        }

        await db.insert(schema.applicant).values({
            ...data,
            contactNumber: parseInt(data.contactNumber),
        });

        return NextResponse.json({ data, status: 200 }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error", status: 500 });
    }


}
