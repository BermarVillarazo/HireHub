import { ParamsProps, jobRequestSchema, jobRequestSchemaProps,  } from "@/app/types/type";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import * as schema from "@/lib/schema";
import { eq } from "drizzle-orm";



export async function POST(request: Request, {params} : ParamsProps) {
    try {
        const name = params.id
        const data: jobRequestSchemaProps = await request.json();
        const validationResult = jobRequestSchema.safeParse(data);
        let deptId;
        let officeId;

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

        const existDepartment = await db.select().from(schema.department).where(eq(schema.department.department_code, name ))
        
        if(existDepartment.length > 0) {
            existDepartment.forEach(({ department_id }) => {
            deptId = department_id;
            });

        }else{
            const existOffice = await db
                .select()
                .from(schema.office)
                .where(eq(schema.office.office_name, name));
            existOffice.forEach(({ office_id }) => {
                officeId = office_id;
            });
        }

        

        await db.insert(schema.jobRequest).values({
            ...data,
            departmentId: deptId,
            officeId: officeId,
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
