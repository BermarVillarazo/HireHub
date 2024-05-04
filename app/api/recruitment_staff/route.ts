import { db } from "@/lib/db";
import * as schema from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const users = await db.select().from(schema.users).where(eq(schema.users.role, "user"));

        if (!users) {
            return NextResponse.json({ message: "No user found!", status: 404 });
        }

        return NextResponse.json({ users, status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error", status: 500 });
    }
}

// const 

export async function POST(request: Request){
    try{
        const body = await request.json()
        console.log(body);
        return NextResponse.json({ body}, {status: 200 });
    }catch (error) {
        return NextResponse.json({ message: "Internal Server Error"}, {status: 500 });
    }
}


