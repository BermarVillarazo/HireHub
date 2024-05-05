import { db } from "@/lib/db";
import * as schema from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { ParamsProps } from "../../[id]/route";

//Note: update Office
// Uses : To set/Update the User's OfficeId
export async function PUT(request: Request, { params }: ParamsProps) {
    try {
        const id = params.id.toString();
        const officeId = await request.json();

        console.log();
        const user = await db.select().from(schema.users).where(eq(schema.users.id, id));

        if (!user) {
            return NextResponse.json(
                { message: "User Id not found", status: 404 },
                { status: 404 }
            );
        }

        const reponse = await db
            .update(schema.users)
            .set({
                ...officeId,
                role: "representave",
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