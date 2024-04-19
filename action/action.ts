"use server";

import { db } from "@/lib/db";
import { applicant, users} from "@/lib/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import * as schema from "@/lib/schema";
import { PgText } from "drizzle-orm/pg-core";

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

export async function ApplicantForm(formData: FormData) {
    enum communicationEnums {
        EMAIL = "email",
        PhoneNumber = "phone_number",
    }

    enum positionEnums {
        TEACHING = "teaching",
        NON_TEACHING = "non_teaching",
    }

    interface applicant{
        first_name: string
        last_name: string
        email: string
        contactNumber: number
        resume_url: string
        comminicationEnums: communicationEnums
        teachingEnums: positionEnums
    }

    const firstName = formData.get("first_name");
    const lastName = formData.get("last_name");
    const email = formData.get("email");
    const contactNumber = formData.get("contact_number");

    const communication: communicationEnums | null = formData.get("communication") as communicationEnums | null;

    const position: positionEnums | null = formData.get("positionType") as positionEnums | null;

    // console.log(communication)
    // console.log(position)
    // console.log({firstName, lastName, email, contactNumber})

    const applicantDetails : applicant =  {
        first_name: formData.get("first_name") as string ,
        last_name: formData.get("last_name") as string,
        email: formData.get("email") as string,
        contactNumber: parseInt(formData.get("contact_number") as string),
        resume_url: formData.get("resume") as string,
        comminicationEnums: formData.get("communication") as communicationEnums,
        teachingEnums: formData.get("positionType") as positionEnums
    };


    const existingUser = await db.query.applicant.findFirst({
        where: and(
            eq(applicant.email, `${applicantDetails.email}`)

        )   
    })


    // if(!existingUser){
    //     const newApplicant = await db.insert(schema.applicant).values({
    //         firstName: applicantDetails.first_name,
    //         lastName: applicantDetails.last_name,
    //         email: applicantDetails.email,
    //         contactNumber: applicantDetails.contactNumber,
    //         resume: applicantDetails.resume_url,
    //         communication: applicantDetails.comminicationEnums,
    //         position: applicantDetails.teachingEnums
    //     })
    //     .returning()

    //     return new Response(JSON.stringify(newApplicant))

    //     // console.log(applicantDetails.first_name)
    //     // console.log(applicantDetails.last_name)
    //     // console.log(applicantDetails.email)
    //     // console.log(applicantDetails.contactNumber)
    //     // console.log(applicantDetails.resume_url)
    //     // console.log(applicantDetails.comminicationEnums)
    //     // console.log(applicantDetails.teachingEnums)
    // }

    

    // await db
    //         .update(users)
    //         .set({ role: role })
    //         .where(eq(users.name, `${name}`));


}
