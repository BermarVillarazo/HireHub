"use client";

import { RadioButtonProps } from "@/app/types/type";
import { useEdgeStore } from "@/lib/edgestore";
import * as schema from "@/lib/schema";
import { useState } from "react";
import toast from "react-hot-toast";
import { FileState, MultiFileDropzone } from "../multi-file-dropzone";

export default function ApplicantForm() {
    async function clientAction(formData: FormData) {
        const applicantData: schema.applicants = {
            first_Name: formData.get("first_name") as string,
            last_Name: formData.get("last_name") as string,
            email: formData.get("email") as string,
            contactNumber: formData.get("contact_number") as unknown as number,
            resume: formData.get("resume_url") as string,
            communication: formData.get("communicationOption") as "Email" | "PhoneNumber",
            position: formData.get("applyingType") as "teachingStaff" | "non-teachingStaff",
        };

        const response = await fetch("/api/applicant/apply-now", {
            method: "POST",
            body: JSON.stringify(applicantData),
        });

        if (response.status === 409) {
            const data = await response.json();
            if (Array.isArray(data)) {
                const errorMessages = data.map(({ message }) => message);
                errorMessages.forEach((errorMessages) => {
                    return toast.error(errorMessages);
                });
            } else {
                return toast.error(data.message);
            }
        } else {
            return toast.success("Application submitted successfully!");
        }
    }

    const [fileStates, setFileStates] = useState<FileState[]>([]);
    const { edgestore } = useEdgeStore();
    const [url, setUrls] = useState<{
        url: string;
    }>();
    function updateFileProgress(key: string, progress: FileState["progress"]) {
        setFileStates((fileStates) => {
            const newFileStates = structuredClone(fileStates);
            const fileState = newFileStates.find((fileState) => fileState.key === key);
            if (fileState) {
                fileState.progress = progress;
            }
            return newFileStates;
        });
    }

    return (
        <form action={clientAction} className="flex flex-col">
            <div className="flex flex-col text-white">
                <label>First Name</label>
                <input type="text" name="first_name" className="text-black" />
                <label>Last Name</label>
                <input type="text" name="last_name" className="text-black" />
                <label>Email</label>
                <input type="text" name="email" className="text-black" />
                <label>Contact Number</label>
                <input type="number" name="contact_number" className="text-black" />

                {url && (
                    <input
                        type="text"
                        value={url.url}
                        readOnly
                        name="resume_url"
                        className="hidden"
                    />
                )}
                {/* RADIO BUTTONS */}
                <RadioButton />
            </div>

            <MultiFileDropzone
                value={fileStates}
                onChange={(files) => {
                    setFileStates(files);
                }}
                onFilesAdded={async (addedFiles) => {
                    setFileStates([...fileStates, ...addedFiles]);
                    await Promise.all(
                        addedFiles.map(async (addedFileState) => {
                            try {
                                const res = await edgestore.myPublicFiles.upload({
                                    file: addedFileState.file,
                                    onProgressChange: async (progress: number) => {
                                        updateFileProgress(addedFileState.key, progress);
                                        if (progress === 100) {
                                            // wait 1 second to set it to complete
                                            // so that the user can see the progress bar at 100%
                                            await new Promise((resolve) =>
                                                setTimeout(resolve, 1000)
                                            );
                                            updateFileProgress(addedFileState.key, "COMPLETE");
                                        }
                                    },
                                });
                                setUrls({
                                    url: res.url,
                                });
                                console.log(res);
                            } catch (err) {
                                updateFileProgress(addedFileState.key, "ERROR");
                            }
                        })
                    );
                }}
            />
            <button type="submit">submit</button>
        </form>
    );
}

function RadioButton() {
    return (
        <fieldset className="flex flex-col">
            <legend>Preferred mode of communication</legend>
            <CommunicationOption
                id="email"
                value="Email"
                name="communicationOption"
                label="Email"
            />
            <CommunicationOption
                id="phone_number"
                value="PhoneNumber"
                name="communicationOption"
                label="Phone Number"
            />

            <legend>What type are you applying for?</legend>
            <CommunicationOption
                id="teaching_staff"
                value="teachingStaff"
                name="applyingType"
                label="Teaching Staff"
            />
            <CommunicationOption
                id="non-teaching_staff"
                value="non-teachingStaff"
                name="applyingType"
                label="Non-Teaching Staff"
            />
        </fieldset>
    );
}

function CommunicationOption({ id, value, name, label }: RadioButtonProps) {
    return (
        <div>
            <input
                className="w-4 h-4 transition-colors bg-white border-2 rounded-full appearance-none cursor-pointer peer border-slate-500 checked:border-emerald-500 checked:bg-emerald-500 checked:hover:border-emerald-600"
                type="radio"
                id={id}
                value={value}
                name={name}
            />
            <label className="pl-2 cursor-pointer">{label}</label>
        </div>
    );
}
