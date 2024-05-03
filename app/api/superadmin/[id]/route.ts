import { db } from "@/lib/db";
import * as schema from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

type ParamsProps = {
    params: {
        id: string;
    };
};

export async function GET(request: Request, { params }: ParamsProps) {
    try {
        const id = params.id.toString();
        const userId = await db.select().from(schema.users).where(eq(schema.users.id, id));

        if (!userId) {
            return NextResponse.json(
                { message: "User ID not found", status: 404 },
                { status: 404 }
            );
        }

        return NextResponse.json({ userId, status: 200 }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Internal Server Error", status: 500 },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request, { params }: ParamsProps) {
    try {
        const id = params.id.toString();
        const { role } = await request.json();

        const user = await db.select().from(schema.users).where(eq(schema.users.id, id));

        if (!user) {
            return NextResponse.json(
                { message: "User Id not found", status: 404 },
                { status: 404 }
            );
        }

        const reponse = await db
            .update(schema.users)
            .set({ role: role })
            .where(eq(schema.users.id, id));

        const { command } = reponse;

        return NextResponse.json(
            {
                command,
                message: "User role updated",
                status: 200,
                rows: user,
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
