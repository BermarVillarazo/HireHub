"use client";

import { DepartmentInsert } from "@/lib/schema";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import ConfirmationPopup from "../Modal";

export default function DepartmentLists({ departments }: { departments: DepartmentInsert[] }) {
    const [showConfirmationMessage, setShowConfirmationMessage] = useState(false);
    const [selectedDepartmentId, setSelectedDepartmentId] = useState<number | null>(null);
    const router = useRouter();

    function handleDeleteDepartment(e: any, departmentId: number) {
        e.preventDefault();
        setSelectedDepartmentId(departmentId);
        setShowConfirmationMessage(true);
    }

    async function handleConfirmDeleteDepartment() {
        if (setSelectedDepartmentId === null) return;

        const response = await fetch(`/api/recruitment_staff/department/${selectedDepartmentId}`, {
            method: "DELETE",
            body: JSON.stringify({ selectedDepartmentId }),
        });

        const data = await response.json();

        router.refresh();
        if (response.status === 404) {
            const error = await response.json();
            return toast.error(error);
        } else {
            setShowConfirmationMessage(false);
            return toast.success(data.message);
        }
    }

    return (
        <>
            {departments.map(({ department_id, department_name, department_code }) => (
                <form key={department_id} className="flex justify-between gap-3 items-center">
                    <div className="flex justify-between items-center w-52 p-3 bg-white rounded-lg shadow-xl">
                        <span className="mx-auto">{department_code.toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between items-center w-full p-3 bg-white rounded-lg shadow-xl">
                        <span className="mx-auto">{department_name}</span>
                    </div>
                    <button
                        onClick={(e) => {
                            handleDeleteDepartment(e, department_id);
                        }}
                        className="group w-32 relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-lg border-red-900 bg-gradient-to-tr from-red-700 to-red-800 p-3 font-bold text-white shadow-lg transition duration-100 ease-in-out active:translate-y-0.5 hover:scale-95 active:shadow-none"
                    >
                        Delete
                    </button>
                    {showConfirmationMessage && (
                        <ConfirmationPopup
                            message={`Are you sure you want to delete "${department_name}"?`}
                            onCancel={() => setShowConfirmationMessage(false)}
                            onConfirm={handleConfirmDeleteDepartment}
                        />
                    )}
                </form>
            ))}
        </>
    );
}
