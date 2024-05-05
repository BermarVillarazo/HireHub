import { ParamsProps, departmentSchemaProps, staffDepartmentSchemaProps } from "@/app/types/type";
import { db } from "@/lib/db";
import * as schema from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// Note: set Department
// uses: To set/ update Deparment ID

export async function PUT(request: Request, { params }: ParamsProps) {
    try {
        const id = params.id.toString();
        const data: staffDepartmentSchemaProps = await request.json();

        const user = await db.select().from(schema.users).where(eq(schema.users.id, id));

        if (!user) {
            return NextResponse.json(
                { message: "User Id not found", status: 404 },
                { status: 404 }
            );
        }

        let deptId;
        const departmentName = data.departmentName;
        const departmentId = await db
            .select()
            .from(schema.department)
            .where(eq(schema.department.department_name, departmentName));
        departmentId.forEach(({ department_id }) => {
            deptId = department_id;
        });

        const reponse = await db
            .update(schema.users)
            .set({
                departmentName: departmentName,
                departmentId: deptId,
                role: "representave",
            })
            .where(eq(schema.users.id, id));

        const { command } = reponse;

        return NextResponse.json(
            {
                command,
                message: "Department has been set",
                status: 200,
                user,
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
