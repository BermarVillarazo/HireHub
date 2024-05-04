import { db } from "@/lib/db";
import * as schema from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod"

type ParamsProps = {
    params: {
        id: number;
    };
};

export async function GET(request: Request, { params }: ParamsProps) {
    try {
        const id = params.id
        const departmentId = await db.select().from(schema.department).where(eq(schema.department.department_id, id));

        if (!departmentId) {
            return NextResponse.json(
                { message: "Department not found", status: 404 },
                { status: 404 }
            );
        }

        return NextResponse.json({ departmentId, status: 200 }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Internal Server Error", status: 500 },
            { status: 500 }
        );
    }
}

const departmentSchema = z.object({
    department_name: z
        .string()
        .min(2, { message: "Department Name must have 2 or more characters" })
        .max(75, { message: "Department Name must have 75 or less characters" }),
    department_code: z
        .string()
        .min(3, { message: "Department Type must have 2 or more characters" })
        .max(75, { message: "Department Type must have 75 or less characters" }),
})
type departmentSchemaProps = z.infer<typeof departmentSchema>

export async function PUT(request: Request, { params }: ParamsProps) {
    try {
        const id = params.id;
        const body: departmentSchemaProps = await request.json()
        const validationResult = departmentSchema.safeParse(body)
        if (!validationResult.success) {
            return NextResponse.json(validationResult.error.issues, { status: 409 });
        }

        const department = await db.select().from(schema.department).where(eq(schema.department.department_id, id));

        if (!department) {
            return NextResponse.json(
                { message: "department not found", status: 404 },
                { status: 404 }
            );
        }

        const reponse = await db
            .update(schema.department)
            .set({
                department_name: body.department_name,
                department_code: body.department_code,
            
             })
            .where(eq(schema.department.department_id, id));

        const { command } = reponse;

        return NextResponse.json(
            {
                command,
                message: "department updated",
                status: 200,
                rows: department,
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error", status: 500 },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request, { params }: ParamsProps) {
    try {
        const id = params.id
        const department = await db.select().from(schema.department).where(eq(schema.department.department_id, id));

        if (!department) {
            return NextResponse.json(
                { message: "Department not found", status: 404 },
                { status: 404 }
            );
        }

        const response = await db.delete(schema.department).where(eq(schema.department.department_id, id))

        const { command } = response;

        return NextResponse.json(
            {
                command,
                message: "department updated",
                status: 200,
                rows: department,
            },
            { status: 200 }
        );
 
        
    } catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error", status: 500 },
            { status: 500 }
        );
    }
    
}
