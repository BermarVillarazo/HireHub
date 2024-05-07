import { jobRequestSchema, jobRequestSchemaProps } from "@/app/types/type";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import * as schema from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
    try {
        const result = await db.query.jobRequest.findFirst({
            with: {
                office: true,
            },
        });
        return NextResponse.json({ result: result?.office });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Internal Server Error", status: 500 },
            { status: 500 }
        );
    }
}


export async function Post(request: Request) {
    try {
        const data: jobRequestSchemaProps = await request.json();
        const validationResult = jobRequestSchema.safeParse(data);
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

         const officeName = await db.select().from(schema.office).where(eq(schema.office.office_name, data.officeName))
        
         officeName.forEach(({ office_id }) => {
         officeId = office_id;
        });

        await db.insert(schema.jobRequest).values({
            ...data,
            officeId: officeId
        })

       

    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Internal Server Error", status: 500 },
            { status: 500 }
        );
    }
}

