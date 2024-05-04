"use client";

import { InputProps, TitleProps } from "@/app/types/type";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function DepartmentForm() {
    const router = useRouter();

    async function addDepartment(formData: FormData) {
        const formDepartmentData = {
            department_code: formData.get("department_code"),
            department_name: formData.get("department_name"),
        };

        const response = await fetch("/api/recruitment_staff/department", {
            method: "POST",
            body: JSON.stringify(formDepartmentData),
        });

        if (response.status === 409) {
            const error = await response.json();
            return toast.error(error.message);
        } else {
            router.refresh();
            return toast.success("Department successfully added.");
        }
    }

    return (
        <form action={addDepartment} className="flex gap-8 mt-5">
            <div className="flex flex-1 gap-8">
                <div className="">
                    <Input name="department_code" placeholder="Department Code" />
                </div>
                <div className="w-10/12">
                    <Input name="department_name" placeholder="Department Name" />
                </div>
            </div>

            <Button title="Add Department" />
        </form>
    );
}

export function Input({ name, placeholder }: InputProps) {
    return (
        <input
            type="text"
            name={name}
            placeholder={placeholder}
            className="block w-full p-3 text-sm text-black border border-gray-300 rounded-lg dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
    );
}

export function Button({ title }: TitleProps) {
    return (
        <button
            type="submit"
            className="text-white bg-red-900 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-900 font-medium rounded-lg text-sm px-3 py-1.5"
        >
            {title}
        </button>
    );
}
