import { jobRequestSchema, jobRequestSchemaProps,  } from "@/app/types/type";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import * as schema from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
    try {
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


export async function POST(request: Request) {
    try {
        const data: jobRequestSchemaProps = await request.json();
        const validationResult = jobRequestSchema.safeParse(data);
         let deptId;

        if(!validationResult.success){
            return NextResponse.json(validationResult.error.issues, { status: 409 });
        }

        const requestExist = await db 
            .select()
            .from(schema.jobRequest)
            .where(eq(schema.jobRequest.requested_position, data.requested_position))

       
        if (requestExist.length > 0) {
            return NextResponse.json(
                {
                    message: "Job request for that position already exists please create a new request.",
                    status: 409,
                },
                { status: 409 }
            );
        }

        const departmentName = await db.select().from(schema.department).where(eq(schema.department.department_name, data.departmentName))

        departmentName.forEach(({ department_id }) => {
            deptId = department_id;
        });

        await db.insert(schema.jobRequest).values({
            ...data,
            departmentId: deptId
        })

       
        return NextResponse.json({ data }, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Internal Server Error", status: 500 },
            { status: 500 }
        );
    }
}
