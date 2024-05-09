"use client";

import ConfirmationPopup from "@/components/Modal";
import { JobRequest } from "@/lib/schema";
import { useState } from "react";
import toast from "react-hot-toast";

export default function RequestsForm({ params }: { params: { department: string } }) {
    const [showConfirmationMessage, setShowConfirmationMessage] = useState(false);
    const [formData, setFormData] = useState<JobRequest | null>(null);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const requestFormData: JobRequest = {
            request_description: e.currentTarget.request_description.value,
            request_qualification: e.currentTarget.request_qualification.value,
            request_type: e.currentTarget.request_type.value,
            requested_position: e.currentTarget.requested_position.value,
        };

        setFormData(requestFormData);
        setShowConfirmationMessage(true);
    }

    async function handleSubmitRequestForm() {
        try {
            const response = await fetch(`/api/representative/job_request/${params.department}`, {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.status === 409) {
                return toast.error(
                    "Job request for that position already exists please create a new request."
                );
            }
            return toast.success("Job request created successfully.");
        } catch (error) {
            console.error(error);
            return toast.error("Internal Server Error. Please try again later.");
        }
    }

    return (
        <div className="w-full min-h-screen flex py-10 items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="w-11/12 flex flex-col gap-10 bg-black rounded-2xl px-5 sm:px-10 py-10 text-white"
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

                <button
                    type="submit"
                    className="w-full py-3 px-14 rounded-lg text-white text-center bg-red-900 font-bold transform hover:scale-95 duration-200"
                >
                    Button
                </button>
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
            <textarea name={name} rows={10} className="textarea textarea-md text-black" />
        </div>
    );
}
