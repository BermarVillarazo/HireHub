import { db } from "@/lib/db";
import * as schema from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET(response: NextResponse) {
    try {
        const departments = await db.select().from(schema.department);

        return NextResponse.json({ departments }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export const departmentSchema = z.object({
    department_name: z
        .string()
        .min(1, { message: "Department Name must have 2 or more characters" })
        .max(256, { message: "Department Name must have 256 or less characters" }),
    department_code: z
        .string()
        .min(1, { message: "Department Code must have 2 or more characters" })
        .max(256, { message: "Department Code must have 256 or less characters" }),
});

export type departmentSchemaProps = z.infer<typeof departmentSchema>;

export async function POST(request: Request) {
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
