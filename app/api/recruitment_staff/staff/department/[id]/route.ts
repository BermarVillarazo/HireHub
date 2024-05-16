import { ParamsProps, staffDepartmentSchemaProps } from "@/app/types/type";
import { db } from "@/lib/db";
import * as schema from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { isEmpty } from "validator";

// Note: set Department
// uses: To set/ update Deparment ID

export async function PUT(request: Request, { params }: ParamsProps) {
    try {
        const id = params.id.toString();
        const data: staffDepartmentSchemaProps = await request.json();

        const user = await db.select().from(schema.users).where(eq(schema.users.id, id));

        if (!user) {
            return NextResponse.json(
                { error: "User Id not found", status: 404 },
                { status: 404 }
            );
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

        if (user[0].departmentId !== null) {
            return NextResponse.json(
                {
                    error: "There is already a user with this department",
                    status: 409,
                },
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
        console.log(error);
        return NextResponse.json(
            { message: "Internal Server Error", status: 500 },
            { status: 500 }
        );
    }
}
