import { departmentSchema, departmentSchemaProps } from "@/types/type";
import { db } from "@/lib/db";
import * as schema from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    try {
        const departments = await db.select().from(schema.department);

        return NextResponse.json({ departments }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body: departmentSchemaProps = await request.json();
        const validationResult = departmentSchema.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json(validationResult.error.issues, { status: 409 });
        }

        const departmentExist = await db
            .select()
            .from(schema.department)
            .where(eq(schema.department.department_name, body.department_name));

        if (departmentExist.length > 0) {
            return NextResponse.json(
                {
                    message: "Department already exists.",
                    status: 409,
                },
                { status: 409 }
            );
        }

        await db.insert(schema.department).values({
            ...body,
        });

        return NextResponse.json({ body }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
