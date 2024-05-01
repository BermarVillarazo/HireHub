import { db } from "@/lib/db";
import * as schema from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextApiRequest } from "next";

export async function GET(request: NextApiRequest, { params }: { params: { id: string } }) {
    const id = params.id.toString();
    const userId = await db.select().from(schema.users).where(eq(schema.users.id, id));
    return new Response(JSON.stringify({ userId }), { status: 200 });
}
