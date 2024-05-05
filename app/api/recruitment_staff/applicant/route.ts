import { departmentSchema, departmentSchemaProps } from "@/app/types/type";
import { db } from "@/lib/db";
import * as schema from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const applicants = await db.select().from(schema.applicant);

    return NextResponse.json({ applicants }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
