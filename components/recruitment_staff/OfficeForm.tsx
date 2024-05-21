"use client";

import { InputProps } from "@/types/type";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import ConfirmationPopup from "../Modal";

type FormDataState = {
    office_code: FormDataEntryValue | null;
    office_name: FormDataEntryValue | null;
};

export default function OfficetForm() {
    const [showConfirmationMessage, setShowConfirmationMessage] = useState(false);
    const [formData, setFormData] = useState<FormDataState | null>(null);
    const router = useRouter();

    function addOffice(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formOfficeData = {
            office_code: e.currentTarget.office_code.value,
            office_name: e.currentTarget.office_name.value,
        };

        setShowConfirmationMessage(true);
        setFormData(formOfficeData);
    }

    async function handleAddOffice() {
        try {
            const response = await fetch("/api/recruitment_staff/office", {
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
        <form onSubmit={addOffice} className="flex gap-3 mt-5">
            <div className="flex flex-1 gap-3">
                <div>
                    <Input name="office_code" placeholder="Office Code" />
                </div>
                <div className="w-10/12">
                    <Input name="office_name" placeholder="Office Name" />
                </div>
            </div>

            <button
                type="submit"
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
