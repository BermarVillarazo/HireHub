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

export async function PUT(request: NextApiRequest,res: NextApiResponse, { params }: { params: { id: string } }){
    // try {

        // const id = params.id.toString();
        // const {role} = request.body;
        // console.log(role)
        // console.log(id)
        // Fetch the user from the database based on the id
        // const user = await db.select().from(schema.users).where(eq(schema.users.id, id));

        // if (!user) {
        //     return res.status(404).json({ error: 'User not found' });
        // }

        // // Update the user's role
        // const reponse = await db.update(schema.users).set({ role: role }).where(eq(schema.users.id, id));

        return NextResponse.json(JSON.stringify({ msg: "hello" }), { status: 200 });
    // } catch (error) {
    //     return res.status(500).json({ error: 'Internal server error' });
    // }

}