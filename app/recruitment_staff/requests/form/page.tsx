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
                const error = await response.json();
                console.log(error);
                if (Array.isArray(error)) {
                    const errorMessages = error.map(({ message }) => message);
                    errorMessages.forEach((errorMessages) => {
                        console.log(errorMessages);
                        return toast.error(errorMessages);
                    });
                }
            } else if (!formData) {
                return toast.error("Please input the fields");
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
                className="w-full flex flex-col gap-10 bg-white rounded-2xl p-10 text-black drop-shadow-xl shadow-inner"
            >
                <h1 className="text-center font-bold text-2xl text-red-600">
                    Personnel Request Form
                </h1>
                <div className="flex flex-col text-white gap-10">
                    <LabelAndInput name="requested_position" title="Position Requested" />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-black text-sm">Type</label>
                    <div className="flex gap-5">
                        <CommunicationRadioButton value="new" name="request_type" label="New" />
                        <CommunicationRadioButton
                            value="replacement"
                            name="request_type"
                            label="Replacement"
                        />
                    </div>
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
        <div className="w-full flex flex-col gap-1 text-black">
            <label className="text-sm">{title}</label>
            <input
                type="text"
                name={name}
                className="text-black border-2 border-red-400 p-2 rounded-md shadow-md"
            />
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
            <label className="flex items-center justify-center gap-2 text-black cursor-pointer text-sm lg:text-md">
                <input
                    type="radio"
                    value={value}
                    name={name}
                    className="radio radio-error shadow-md"
                />
                {label}
            </label>
        </div>
    );
}

function LabelAndTextarea({ title, name }: { title: string; name: string }) {
    return (
        <div className="w-full flex flex-col text-black gap-1">
            <label className="text-black text-sm">{title}</label>
            <textarea
                name={name}
                rows={15}
                className="text-black border-2 border-red-400 p-2 rounded-md shadow-md"
            />
        </div>
    );
}
