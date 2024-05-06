"use client";

import { Input } from "@/app/recruitment_staff/department/page";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import ConfirmationPopup from "../Modal";

type FormDataState = {
    office_code: FormDataEntryValue | null;
    office_name: FormDataEntryValue | null;
};

export default function OfficeForm() {
    const [showConfirmationMessage, setShowConfirmationMessage] = useState(false);
    const [formData, setFormData] = useState<FormDataState | null>(null);
    const router = useRouter();

    function addOffice(formData: FormData) {
        const formOfficeData = {
            office_code: formData.get("office_code"),
            office_name: formData.get("office_name"),
        };
        setFormData(formOfficeData);

        setShowConfirmationMessage(true);
    }

    async function handleAddOffice() {
        const response = await fetch("/api/recruitment_staff/office", {
            method: "POST",
            body: JSON.stringify(formData),
        });

        if (response.status === 409) {
            const error = await response.json();
            if (Array.isArray(error)) {
                const errorMessage = error.map(({ message }) => message);
                errorMessage.forEach((message) => {
                    return toast.error(message);
                });
            } else return toast.error(error.message);
        } else {
            setShowConfirmationMessage(false);
            router.refresh();
            return toast.success("Office successfully added.");
        }
    }

    return (
        <form className="flex gap-3 mt-5">
            <div className="flex flex-1 gap-3">
                <div className="">
                    <Input name="office_code" placeholder="Office Code" />
                </div>
                <div className="w-10/12">
                    <Input name="office_name" placeholder="Office Name" />
                </div>
            </div>

            <button
                type="submit"
                formAction={addOffice}
                className="group relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-lg border-red-900 bg-gradient-to-tr from-red-700 to-red-800 px-3 font-bold text-white shadow-lg transition duration-100 ease-in-out active:translate-y-0.5 hover:scale-95 active:shadow-none"
            >
                Add Office
            </button>
            {showConfirmationMessage && (
                <ConfirmationPopup
                    message="Are you sure you want to add office?"
                    onCancel={() => setShowConfirmationMessage(false)}
                    onConfirm={handleAddOffice}
                />
            )}
        </form>
    );
}
