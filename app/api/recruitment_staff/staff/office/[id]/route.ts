import { ParamsProps } from "@/app/types/type";
import { db } from "@/lib/db";
import * as schema from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

//Note: update Office
// Uses : To set/Update the User's OfficeId
const officeSchema = z.object({
    officeName: z.string(),
});

type officeSchemaProps = z.infer<typeof officeSchema>;

export async function PUT(request: Request, { params }: ParamsProps) {
    try {
        const id = params.id.toString();
        const data: officeSchemaProps = await request.json();

        const user = await db.select().from(schema.users).where(eq(schema.users.id, id));

        if (!user) {
            return NextResponse.json(
                { message: "User Id not found", status: 404 },
                { status: 404 }
            );
        }

        let oId;
        const officeName = data.officeName;

        const officeId = await db
            .select()
            .from(schema.office)
            .where(eq(schema.office.office_name, officeName));
        officeId.forEach(({ office_id }) => {
            oId = office_id;
        });

        if(officeId.length > 0) {
            return NextResponse.json(
            {
            
                message: "There's already a user with this office",
                status: 409,
            },
            { status: 409 }
        );

        }

        const reponse = await db
            .update(schema.users)
            .set({
                officeName: officeName,
                officeId: oId,
                role: "representative",
            })
            .where(eq(schema.users.id, id));

        const { command } = reponse;

        return NextResponse.json(
            {
                command,
                message: "Office has been set",
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
