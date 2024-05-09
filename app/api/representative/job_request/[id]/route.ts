import { ParamsProps, jobRequestSchema, jobRequestSchemaProps } from "@/app/types/type";
import { db } from "@/lib/db";
import * as schema from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(response: NextResponse, request: NextRequest, { params }: ParamsProps) {
    try {
        const name = params.id;
        const existDepartment = await db
            .select()
            .from(schema.department)
            .where(eq(schema.department.department_code, name));

        const result = await db.query.jobRequest.findFirst({
            with: {
                department: true,
            },
        });
        return NextResponse.json({ result: result?.department });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Internal Server Error", status: 500 },
            { status: 500 }
        );
    }
}

export async function POST(request: Request, { params }: ParamsProps) {
    try {
        const id = params.id;
        const data: jobRequestSchemaProps = await request.json();
        const validationResult = jobRequestSchema.safeParse(data);
        let deptId;
        let officeId;
        let deptName;
        let officeName;

        if (!validationResult.success) {
            return NextResponse.json(validationResult.error.issues, { status: 409 });
        }

        const requestExist = await db
            .select()
            .from(schema.jobRequest)
            .where(eq(schema.jobRequest.requested_position, data.requested_position));

        if (requestExist.length > 0) {
            return NextResponse.json(
                {
                    message:
                        "Job request for that position already exists please create a new request.",
                    status: 409,
                },
                { status: 409 }
            );
        }

        const existDepartment = await db
            .select()
            .from(schema.department)
            .where(eq(schema.department.department_name, id));

        if (existDepartment.length > 0) {
            existDepartment.forEach(({ department_id, department_name }) => {
                deptId = department_id;
                deptName = department_name;
            });
        } else {
            const existOffice = await db
                .select()
                .from(schema.office)
                .where(eq(schema.office.office_name, id));
            existOffice.forEach(({ office_id, office_name }) => {
                officeId = office_id;
                officeName = office_name;
            });
        }
        await db.insert(schema.jobRequest).values({
            ...data,
            departmentId: deptId,
            officeId: officeId,
            officeName: officeName,
            departmentName: deptName,
        });

        return NextResponse.json({ data }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Internal Server Error", status: 500 },
            { status: 500 }
        );
    }
}
