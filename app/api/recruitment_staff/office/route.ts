import { db } from "@/lib/db";
import * as schema from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod"


export async function GET(response: NextResponse) {
    try {
        const offices = await db.select().from(schema.office)

       console.log(offices)

        return NextResponse.json({ offices }, {status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, {status: 500 });
    }
}


const officeSchema = z.object({
    office_name: z
        .string()
        .min(2, { message: "office Name must have 2 or more characters" })
        .max(75, { message: "office Name must have 75 or less characters" }),
    office_code: z 
        .string()
        .min(3, { message: "office Type must have 2 or more characters" })
        .max(75, { message: "office Type must have 75 or less characters" }),
})
type officeSchemaProps = z.infer<typeof officeSchema>

export async function POST(request: Request){
    try{
        const body : officeSchemaProps = await request.json()
        const validationResult = officeSchema.safeParse(body)
        if (!validationResult.success) {
            return NextResponse.json(validationResult.error.issues, { status: 409 });
        }
        const OfficeExist = await db.select().from(schema.office).where(eq(schema.office.office_name, body.office_name))

        if (OfficeExist.length > 0) {
            return NextResponse.json(
                {
                    message: "Department already exists.",
                    status: 409,
                },
                { status: 409 }
            );
        }

        await db.insert(schema.office).values({
            ...body
        })
        
        console.log(body);
        return NextResponse.json({ body}, {status: 200 });
    }catch (error) {
        return NextResponse.json({ message: "Internal Server Error"}, {status: 500 });
    }
}