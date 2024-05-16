"use client";

import Button from "@/components/Button";
import ConfirmationPopup from "@/components/Modal";
import { JobRequestInsert } from "@/lib/schema";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

export default function RequestsForm({ params }: { params: { department: string } }) {
    const [showConfirmationMessage, setShowConfirmationMessage] = useState(false);
    const [formData, setFormData] = useState<JobRequestInsert | null>(null);
    const router = useRouter();

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const requestFormData = {
            requested_position: e.currentTarget.requested_position.value,
            request_type: e.currentTarget.request_type.value,
            request_description: e.currentTarget.request_description.value,
            request_qualification: e.currentTarget.request_qualification.value,
        };

        setFormData(requestFormData);
        setShowConfirmationMessage(true);
    }

    async function handleSubmitRequestForm() {
        try {
            const response = await fetch(`/api/representative/job_request/${params.department}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (response.status === 409) {
                return toast.error(
                    "Job request for that position already exists please create a new request."
                );
            } else {
                setShowConfirmationMessage(false);
                router.refresh();
                return toast.success("Job request created successfully.");
            }
        } catch (error) {
            console.error(error);
            return toast.error("Internal Server Error. Please try again later.");
        }
    }

    return (
        <div className="w-full min-h-screen flex p-5 items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-10 bg-black/80 rounded-2xl p-10 text-white"
            >
                <h1 className="text-center font-bold text-xl text-white">PERSONNEL REQUEST FORM</h1>
                <div className="flex flex-col text-white gap-10">
                    <LabelAndInput name="requested_position" title="Position Requested" />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-white font-bold">Type</label>
                    <CommunicationRadioButton value="new" name="request_type" label="New" />
                    <CommunicationRadioButton
                        value="replacement"
                        name="request_type"
                        label="Replacement"
                    />
                </div>

                <div className="flex flex-col gap-5">
                    <LabelAndTextarea name="request_description" title="Description" />
                    <LabelAndTextarea name="request_qualification" title="Qualifications" />
                </div>

                <Button>Submit Form</Button>
                {showConfirmationMessage && (
                    <ConfirmationPopup
                        message="Are you sure you want to add office?"
                        onCancel={() => setShowConfirmationMessage(false)}
                        onConfirm={handleSubmitRequestForm}
                    />
                )}
            </form>
        </div>
    );
}

function LabelAndInput({ title, name }: { title: string; name: string }) {
    return (
        <div className="w-full flex flex-col gap-1">
            <label className="font-semibold">{title}</label>
            <input type="text" name={name} className="input input-sm text-black" />
        </div>
    );
}

type CommunicationRadioButtonProps = {
    value: string;
    name: string;
    label: string;
};

function CommunicationRadioButton({ value, name, label }: CommunicationRadioButtonProps) {
    return (
        <div className="flex items-center">
            <label className="flex justify-center gap-3 py-2 cursor-pointer text-sm lg:text-lg font-medium">
                <input type="radio" value={value} name={name} className="radio radio-error" />
                {label}
            </label>
        </div>
    );
}

function LabelAndTextarea({ title, name }: { title: string; name: string }) {
    return (
        <div className="w-full flex flex-col gap-1">
            <label className="font-semibold">{title}</label>
            <textarea name={name} rows={15} className="textarea textarea-md text-black" />
        </div>
    );
}
