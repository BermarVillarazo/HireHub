// todo: Get all department
// todo: Get all applicants sa


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
        const id = params.id
        const result = await db.query.users.findFirst({
            where: (users, { eq }) => (eq(users.id, id)),
            with: {
                department : true
            }
        })
        console.log(result);
        return NextResponse.json({ result: result?.department?.department_code });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Internal Server Error", status: 500 },
            { status: 500 }
        );
    }
}
