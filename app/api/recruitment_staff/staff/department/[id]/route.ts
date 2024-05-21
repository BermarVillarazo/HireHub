import { db } from "@/lib/db";
import * as schema from "@/lib/schema";
import { ParamsIdProps, ParamsProps, staffDepartmentSchemaProps } from "@/types/type";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: ParamsIdProps) {
    const { id } = params;

    const user = await db.select().from(schema.users).where(eq(schema.users.departmentId, id));
    const department = await db
        .select()
        .from(schema.department)
        .where(eq(schema.department.department_id, id));

    return NextResponse.json({ department, user }, { status: 200 });
}

export async function PUT(request: NextRequest, { params }: ParamsProps) {
    try {
        const { id } = params;
        const data: staffDepartmentSchemaProps = await request.json();

        const user = await db
            .select()
            .from(schema.users)
            .where(eq(schema.users.departmentName, id));

        if (!user) {
            return NextResponse.json({ error: "User Id not found", status: 404 }, { status: 404 });
        }

        let deptId;
        const departmentName = data.departmentName;

        const departmentExist = await db
            .select()
            .from(schema.department)
            .where(eq(schema.department.department_name, departmentName));

        if (departmentExist.length === 0) {
            return NextResponse.json(
                { message: "Error, No department name found" },
                { status: 404 }
            );
        }

        const departmentId = await db
            .select()
            .from(schema.department)
            .where(eq(schema.department.department_name, departmentName));
        departmentId.forEach(({ department_id }) => {
            deptId = department_id;
        });

        if (departmentId.length > 0 && user.length > 1) {
            return NextResponse.json(
                { error: "There is already a user in this department" },
                { status: 409 }
            );
        }

        const reponse = await db
            .update(schema.users)
            .set({
                departmentName: departmentName,
                departmentId: deptId,
                role: "representative",
            })
            .where(eq(schema.users.id, id.toString()));

        const { command } = reponse;

        return NextResponse.json({ departmentId, user }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Internal Server Error", status: 500 },
            { status: 500 }
        );
    }
}
