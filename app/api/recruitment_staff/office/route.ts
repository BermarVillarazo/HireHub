import { db } from "@/lib/db";
import * as schema from "@/lib/schema";
import { officeSchema, officeSchemaProps } from "@/types/type";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const offices = await db.select().from(schema.office);

        return NextResponse.json({ offices }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body: officeSchemaProps = await request.json();
        const validationResult = officeSchema.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json(validationResult.error.issues, { status: 409 });
        }

        const OfficeExist = await db
            .select()
            .from(schema.office)
            .where(eq(schema.office.office_name, body.office_name));

        if (OfficeExist.length > 0) {
            return NextResponse.json(
                {
                    message: "Office already exists.",
                    status: 409,
                },
                { status: 409 }
            );
        }

        await db.insert(schema.office).values({
            ...body,
        });

        return NextResponse.json({ body }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
