import { db } from "@/lib/db";
import * as schema from "@/lib/schema";
import { ParamsIdProps, ParamsProps } from "@/types/type";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(request: NextRequest, { params }: ParamsIdProps) {
    const { id } = params;

    const user = await db.select().from(schema.users).where(eq(schema.users.departmentId, id));
    const department = await db
        .select()
        .from(schema.department)
        .where(eq(schema.department.department_id, id));

    return NextResponse.json({ department, user }, { status: 200 });
}

const officeSchema = z.object({
    officeName: z.string(),
});

type officeSchemaProps = z.infer<typeof officeSchema>;

export async function PUT(request: Request, { params }: ParamsProps) {
    try {
        const { id } = params;
        const data: officeSchemaProps = await request.json();

        const user = await db.select().from(schema.users).where(eq(schema.users.officeName, id));

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

        if (officeId.length > 0 && user.length > 1) {
            return NextResponse.json(
                { error: "There is already a user in this department" },
                { status: 409 }
            );
        }

        const reponse = await db
            .update(schema.users)
            .set({
                officeName: officeName,
                officeId: oId,
                departmentName: null,
                departmentId: null,
                role: "representative",
            })
            .where(eq(schema.users.id, id.toString()));

        const { command } = reponse;

        return NextResponse.json({ officeId, user }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Internal Server Error", status: 500 },
            { status: 500 }
        );
    }
}
