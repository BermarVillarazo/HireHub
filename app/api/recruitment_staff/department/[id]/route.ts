import { db } from "@/lib/db";
import * as schema from "@/lib/schema";
import {
    requirementStaffDepartmentSchema,
    requirementStaffDepartmentSchemaProps,
} from "@/types/type";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

type ParamsProps = {
    params: {
        id: number;
    };
};

export async function GET(request: Request, { params }: ParamsProps) {
    try {
        const id = params.id;

        const user = await db.select().from(schema.users).where(eq(schema.users.departmentId, id));

        const departmentId = await db
            .select()
            .from(schema.department)
            .where(eq(schema.department.department_id, id));

        return NextResponse.json({ departmentId, user }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error", status: 500 },
            { status: 500 }
        );
    }
}

// Update Deparment Code and name
export async function PUT(request: Request, { params }: ParamsProps) {
    try {
        const id = params.id;
        const body: requirementStaffDepartmentSchemaProps = await request.json();
        const validationResult = requirementStaffDepartmentSchema.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json(validationResult.error.issues, { status: 409 });
        }

        const department = await db
            .select()
            .from(schema.department)
            .where(eq(schema.department.department_id, id));

        if (!department) {
            return NextResponse.json(
                { message: "Department not found", status: 404 },
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
                message: "Department Updated",
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
        const id = params.id;

        const department = await db
            .select()
            .from(schema.department)
            .where(eq(schema.department.department_id, id));

        if (!department) {
            return NextResponse.json(
                { message: "Department not found", status: 404 },
                { status: 404 }
            );
        }

        const response = await db
            .delete(schema.department)
            .where(eq(schema.department.department_id, id));

        const { command } = response;

        return NextResponse.json(
            {
                command,
                message: "Department deleted",
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
