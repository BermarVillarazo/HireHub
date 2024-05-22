import { db } from "@/lib/db";
import * as schema from "@/lib/schema";
import { officeSchema, officeSchemaProps } from "@/types/type";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

type ParamsProps = {
    params: {
        id: number;
    };
};

export async function GET(request: Request, { params }: ParamsProps) {
    try {
        const id = params.id;

        const officeId = await db
            .select()
            .from(schema.office)
            .where(eq(schema.office.office_id, id));

        if (!officeId) {
            return NextResponse.json(
                { message: "Office ID not found", status: 404 },
                { status: 404 }
            );
        }

        return NextResponse.json({ officeId, status: 200 }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error", status: 500 },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request, { params }: ParamsProps) {
    try {
        const id = params.id;
        const body: officeSchemaProps = await request.json();
        const validationResult = officeSchema.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json(validationResult.error.issues, { status: 409 });
        }

        const office = await db
            .select()
            .from(schema.department)
            .where(eq(schema.department.department_id, id));

        if (!office) {
            return NextResponse.json({ message: "Office not found", status: 404 }, { status: 404 });
        }

        const reponse = await db
            .update(schema.office)
            .set({
                office_name: body.office_name,
                office_code: body.office_code,
            })
            .where(eq(schema.office.office_id, id));

        // await db.update(schema.office).set({
        //     office_name: null,
        //     office_code: null,
        // });

        const { command } = reponse;

        return NextResponse.json(
            {
                command,
                message: "Office Updated",
                status: 200,
                rows: office,
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error", status: 500 },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request, { params }: ParamsProps) {
    try {
        const id = params.id;
        const office = await db.select().from(schema.office).where(eq(schema.office.office_id, id));

        if (!office) {
            return NextResponse.json({ message: "Office Not Found", status: 404 }, { status: 404 });
        }

        const response = await db.delete(schema.office).where(eq(schema.office.office_id, id));

        const { command } = response;

        return NextResponse.json(
            {
                command,
                message: "Office Updated",
                status: 200,
                rows: office,
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error", status: 500 },
            { status: 500 }
        );
    }
}
