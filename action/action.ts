"use server";

import { db } from "@/lib/db";
import * as schema from "@/lib/schema";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function HandleUpdateUser(formData: FormData) {
    enum UserRole {
        HR_HEAD = "hr_head",
        SUPER_ADMIN = "super_admin",
        VP_ACAD = "vp_acad",
        VP_ADMIN = "vp_admin",
    }

    const name = formData.get("verify");
    const role: UserRole | null = formData.get("role") as UserRole | null;

    if (role && Object.values(UserRole).includes(role)) {
        await db
            .update(users)
            .set({ role: role })
            .where(eq(users.name, `${name}`));
    } else {
        console.error("Invalid role:", role);
    }
    revalidatePath("/super_admin");
}

export async function ApplicantForm(applicantData: schema.applicants) {
    if (!applicantData.contactNumber) {
        return {
            error: true,
            message: "Please input all fields",
        };
    }

    await db.insert(schema.applicant).values({
        first_Name: applicantData.first_Name,
        last_Name: applicantData.last_Name,
        email: applicantData.email,
        contactNumber: applicantData.contactNumber,
        resume: applicantData.resume,
        communication: applicantData.communication,
        position: applicantData.position,
    });

    return {
        error: !applicantData || Object.values(applicantData).some((value) => !value),
    };
}
