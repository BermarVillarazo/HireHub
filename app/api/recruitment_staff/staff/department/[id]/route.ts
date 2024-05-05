import { db } from "@/lib/db";
import * as schema from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { ParamsProps } from "../../[id]/route";
import { z } from "zod";

// Note: set Department
// uses: To set/ update Deparment ID

const departmentSchema = z.object({
    departmentName: z.string(),
})

type departmentSchemaProps= z.infer<typeof departmentSchema>;


export async function PUT(request: Request, { params }: ParamsProps) {
    try {
        const id = params.id.toString();
        const data: departmentSchemaProps = await request.json();
        let deptId

        
        const user = await db.select().from(schema.users).where(eq(schema.users.id, id));

        if (!user) {
            return NextResponse.json(
                { message: "User Id not found", status: 404 },
                { status: 404 }
            );
        }
        const departmentName = data.departmentName
        const departmentId = await db.select().from(schema.department).where(eq(schema.department.department_name, departmentName))
        departmentId.forEach(({ department_id }) => {
            
            deptId = department_id
            
        })
      
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