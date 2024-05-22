"use client";

import { OfficeInsert } from "@/lib/schema";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import ConfirmationPopup from "../Modal";

export default function OfficeLists({ offices }: { offices: OfficeInsert[] }) {
    const [showConfirmationMessage, setShowConfirmationMessage] = useState(false);
    const [selectedOfficeId, setSelectedOfficeId] = useState<number | null>(null);
    const router = useRouter();

    function handleDeleteOffice(e: any, officeId: number) {
        e.preventDefault();
        setSelectedOfficeId(officeId);
        setShowConfirmationMessage(true);
    }

    async function handleConfirmDeleteOffice() {
        if (setSelectedOfficeId === null) return;

        const response = await fetch(`/api/recruitment_staff/office/${selectedOfficeId}`, {
            method: "DELETE",
            body: JSON.stringify({ selectedOfficeId }),
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
            {offices.map(({ office_id, office_name, office_code }) => (
                <form key={office_id} className="flex justify-between gap-3 items-center">
                    <div className="flex justify-between items-center w-52 p-3 bg-white rounded-lg shadow-xl">
                        <span className="mx-auto">{office_code.toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between items-center w-full p-3 bg-white rounded-lg shadow-xl">
                        <span className="mx-auto">{office_name}</span>
                    </div>
                    <button
                        onClick={(e) => {
                            handleDeleteOffice(e, office_id!);
                        }}
                        className="group w-32 relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-lg border-red-900 bg-gradient-to-tr from-red-700 to-red-800 p-3 font-bold text-white shadow-lg transition duration-100 ease-in-out active:translate-y-0.5 hover:scale-95 active:shadow-none"
                    >
                        Delete
                    </button>
                    {showConfirmationMessage && (
                        <ConfirmationPopup
                            message={`Are you sure you want to delete "${office_name}"?`}
                            onCancel={() => setShowConfirmationMessage(false)}
                            onConfirm={handleConfirmDeleteOffice}
                        />
                    )}
                </form>
            ))}
        </>
    );
}
