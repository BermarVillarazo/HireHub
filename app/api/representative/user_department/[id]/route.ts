// todo: Get all department
// todo: Get all applicants sa

import { ParamsProps } from "@/app/types/type";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(response: NextResponse, request: NextRequest, { params }: ParamsProps) {
    try {
        const id = params.id;
        const result = await db.query.users.findFirst({
            where: (users, { eq }) => eq(users.id, id),
            with: {
                department: true,
            },
        });
        return NextResponse.json({ result: result?.department?.department_code });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Internal Server Error", status: 500 },
            { status: 500 }
        );
    }
}
