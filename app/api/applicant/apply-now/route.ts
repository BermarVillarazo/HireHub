import { db } from "@/lib/db";
import * as schema from "@/lib/schema";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const applicants = await db.select().from(schema.applicant);

        if (!applicants) {
            return NextResponse.json({ message: "No applicant found!", status: 404 });
        }

        return NextResponse.json({ applicants, status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error", status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { first_Name, last_Name, email, contactNumber, communication, position, resume } =
            await request.json();

        if (!first_Name || !last_Name || !email || !contactNumber || !communication || !position) {
            return NextResponse.json({ message: "Please input all fields", status: 400 });
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
        return NextResponse.json({ message: "Internal Server Error", status: 500 });
    }
}
