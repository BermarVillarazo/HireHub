"use client";

import { Input } from "@/app/recruitment_staff/department/page";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import ConfirmationPopup from "../Modal";

type FormDataState = {
    department_code: FormDataEntryValue | null;
    department_name: FormDataEntryValue | null;
};

export default function DepartmentForm() {
    const [showConfirmationMessage, setShowConfirmationMessage] = useState(false);
    const [formData, setFormData] = useState<FormDataState | null>(null);
    const router = useRouter();

    function addDepartment(formData: FormData) {
        const formDepartmentData = {
            department_code: formData.get("department_code"),
            department_name: formData.get("department_name"),
        };
        setFormData(formDepartmentData);

        setShowConfirmationMessage(true);
    }

    async function handleAddDepartment() {
        const response = await fetch("/api/recruitment_staff/department", {
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
            return toast.success("Department successfully added.");
        }
    }

    return (
        <form className="flex gap-3 mt-5">
            <div className="flex flex-1 gap-3">
                <div className="">
                    <Input name="department_code" placeholder="Department Code" />
                </div>
                <div className="w-10/12">
                    <Input name="department_name" placeholder="Department Name" />
                </div>
            </div>

            <button
                type="submit"
                formAction={addDepartment}
                className="group relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-lg border-red-900 bg-gradient-to-tr from-red-700 to-red-800 px-3 font-bold text-white shadow-lg transition duration-100 ease-in-out active:translate-y-0.5 hover:scale-95 active:shadow-none"
            >
                Add Department
            </button>
            {showConfirmationMessage && (
                <ConfirmationPopup
                    message="Are you sure you want to add department?"
                    onCancel={() => setShowConfirmationMessage(false)}
                    onConfirm={handleAddDepartment}
                />
            )}
        </form>
    );
}
