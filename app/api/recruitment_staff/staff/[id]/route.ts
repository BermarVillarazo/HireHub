import { db } from "@/lib/db";
import * as schema from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export type ParamsProps = {
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
