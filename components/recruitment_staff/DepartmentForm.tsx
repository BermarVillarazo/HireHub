"use client";

import { InputProps } from "@/types/type";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
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

    function addDepartment(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formDepartmentData = {
            department_code: e.currentTarget.department_code.value.toUpperCase(),
            department_name: e.currentTarget.department_name.value,
        };

        setShowConfirmationMessage(true);
        setFormData(formDepartmentData);
    }

    async function handleAddDepartment() {
        try {
            const response = await fetch("/api/recruitment_staff/department", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
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
        } catch (error) {
            return toast.error("Internal Server Error. Please try again later.");
        }
    }

    return (
        <form onSubmit={addDepartment} className="flex gap-3 mt-5">
            <div className="flex flex-1 gap-3">
                <div>
                    <Input name="department_code" placeholder="Department Code" />
                </div>
                <div className="w-10/12">
                    <Input name="department_name" placeholder="Department Name" />
                </div>
            </div>

            <button
                type="submit"
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

function Input({ name, placeholder }: InputProps) {
    return (
        <input
            type="text"
            name={name}
            placeholder={placeholder}
            className="block w-full p-3 text-sm text-black border border-gray-300 rounded-lg dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
    );
}
