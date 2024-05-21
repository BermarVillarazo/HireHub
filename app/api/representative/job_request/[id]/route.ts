import { db } from "@/lib/db";
import * as schema from "@/lib/schema";
import { ParamsIdProps, ParamsProps } from "@/types/type";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(request: NextRequest, { params }: ParamsIdProps) {
    try {
        const { id } = params;
        const jobRequest = await db
            .select()
            .from(schema.jobRequest)
            .where(eq(schema.jobRequest.request_id, id));

        return NextResponse.json({ jobRequest });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Internal Server Error", status: 500 },
            { status: 500 }
        );
    }
}

const jobRequestSchema = z.object({
    requested_position: z
        .string()
        .min(3, { message: "Position Requested must have 3 or more characters" }),
    request_type: z.enum(["new", "replacement"]),
    request_description: z
        .string()
        .min(3, { message: "Description must have 3 or more characters" }),
    request_qualification: z
        .string()
        .min(3, { message: "Qualification must have 3 or more characters" }),
    // departmentName: z.string().default("empty"),
});

type jobRequestSchemaProps = z.infer<typeof jobRequestSchema>;

export async function POST(request: Request, { params }: ParamsProps) {
    try {
        const id = params.id;
        const data: jobRequestSchemaProps = await request.json();
        const validationResult = jobRequestSchema.safeParse(data);

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

        const existOffice = await db
            .select()
            .from(schema.office)
            .where(eq(schema.office.office_name, id));

        let deptId;
        let deptName;
        let officeId;
        let officeName;
        if (existDepartment.length > 0) {
            existDepartment.forEach(({ department_id, department_name }) => {
                deptId = department_id;
                deptName = department_name;
            });
        } else {
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
