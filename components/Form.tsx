"use client";

import { ApplicantForm } from "@/action/action";
import { ApplicantFormProps, RadioButtonProps } from "@/app/types/type";
import toast from "react-hot-toast";
import * as schema from "@/lib/schema";

export default function Form() {
    async function clientAction(formData: FormData) {
        const applicantData: schema.Applicant = {
            id: formData.get("id")?.toString() as string,
            first_Name: formData.get("first_name")?.toString() as string,
            last_Name: formData.get("last_name")?.toString() as string,
            email: formData.get("email")?.toString() as string,
            contactNumber: formData.get("contact_number")?.toString() as unknown as number,
            resume : formData.get("resume_url")?.toString() as string,
            communication: formData.get("communicationOption")?.toString() as "Email" | "PhoneNumber",
            position: formData.get("applyingType")?.toString() as "teachingStaff" | "non-teachingStaff",
        };

        const response = await ApplicantForm(applicantData);
        if (response?.error) {
            toast.error("Failed to submit form");
            return;
        }
    }

    return (
        <form action={clientAction} className="flex flex-col">

            <label>ID</label>
            <input type="text" name="id" />

            <label>First Name</label>
            <input type="text" name="first_name" />

            <label>Last Name</label>
            <input type="text" name="last_name" />

            <label>Email</label>
            <input type="text" name="email" />

            <label>Contact Number</label>
            <input type="number" name="contact_number" />

            <label>Resume</label>
            <input type="text" name="resume_url" />

            {/* RADIO BUTTONS */}
            <RadioButton />

            <button type="submit">submit</button>
        </form>
    );
}

function RadioButton() {
    return (
        <fieldset className="flex flex-col">
            <legend>Preferred mode of communication</legend>
            <CommunicationOption
                id="email"
                value="Email"
                name="communicationOption"
                label="Email"
            />
            <CommunicationOption
                id="phone_number"
                value="PhoneNumber"
                name="communicationOption"
                label="Phone Number"
            />

            <legend>What type are you applying for?</legend>
            <CommunicationOption
                id="teaching_staff"
                value="teachingStaff"
                name="applyingType"
                label="Teaching Staff"
            />
            <CommunicationOption
                id="non-teaching_staff"
                value="non-teachingStaff"
                name="applyingType"
                label="Non-Teaching Staff"
            />
        </fieldset>
    );
}

function CommunicationOption({ id, value, name, label }: RadioButtonProps) {
    return (
        <div>
            <input
                className="w-4 h-4 transition-colors bg-white border-2 rounded-full appearance-none cursor-pointer peer border-slate-500 checked:border-emerald-500 checked:bg-emerald-500 checked:hover:border-emerald-600"
                type="radio"
                id={id}
                value={value}
                name={name}
            />
            <label className="pl-2 cursor-pointer">{label}</label>
        </div>
    );
}
