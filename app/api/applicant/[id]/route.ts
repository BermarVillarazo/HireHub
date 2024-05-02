import { db } from "@/lib/db";
import * as schema from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(request: NextApiRequest, { params }: { params: { id: string } }) {
    const id = params.id.toString();
    const userId = await db.select().from(schema.users).where(eq(schema.users.id, id));
    return new Response(JSON.stringify({ userId }), { status: 200 });
}



export async function PUT(request: Request, { params }: { params: { id: string } }){
    try {

        const id = params.id.toString();
        const {role} = await request.json();

        // Fetch the user from the database based on the id
        const user = await db.select().from(schema.users).where(eq(schema.users.id, id));

        if (!user) {
            return NextResponse.json({ status: 404, msg: "user not found" });
        }

        // Update the user's role
        const reponse = await db.update(schema.users).set({ role: role }).where(eq(schema.users.id, id));
         const {command} = reponse;
        return NextResponse.json({command, status: 200, msg: "user role updated" , rows: user});
    } catch (error) {
        return NextResponse.json({ status: 500 , msg: "internal Error User role not found" });
    }

}