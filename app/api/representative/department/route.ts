// todo: Get all department
// todo: Get all applicants sa


import { db } from "@/lib/db";
import * as schema from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";



export async function GET(request: Request) {
    try {
  
        const result = await db.query.department.findFirst({
            with: {
                user : true
            }
        })
        console.log(result);
        return NextResponse.json({ result: result?.user });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Internal Server Error", status: 500 },
            { status: 500 }
        );
    }
}
