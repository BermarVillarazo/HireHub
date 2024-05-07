"use client";

import { applicantInputs } from "@/app/types/type";
import { useEdgeStore } from "@/lib/edgestore";
import { ApplicantInsert, DepartmentSelect, OfficeInsert } from "@/lib/schema";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { FileState, MultiFileDropzone } from "../multi-file-dropzone";

type ApplicantFormProps = {
    departments: DepartmentSelect[];
    offices: OfficeInsert[];
};

export default function ApplicantForm({ departments, offices }: ApplicantFormProps) {
    const [selectedPosition, setSelectedPosition] = useState<
        "teachingStaff" | "non-teachingStaff"
    >();

    async function clientAction(formData: FormData) {
        try {
            const applicantData: ApplicantInsert = {
                first_Name: formData.get("first_name") as string,
                last_Name: formData.get("last_name") as string,
                email: formData.get("email") as string,
                contactNumber: formData.get("contact_number") as unknown as number,
                resume: formData.get("resume_url") as string,
                communication: formData.get("communicationOption") as "Email" | "PhoneNumber",
                position: formData.get("applyingType") as "teachingStaff" | "non-teachingStaff",
                departmentName: formData.get("teachingStaff") as string,
                officeName: formData.get("non-teachingStaff") as string,
            };

            const response = await fetch("/api/applicant/apply-now", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(applicantData),
            });

            if (response.status === 409) {
                const error = await response.json();
                if (Array.isArray(error)) {
                    const errorMessages = error.map(({ message }) => message);
                    errorMessages.forEach((errorMessages) => {
                        console.log(error);
                        return toast.error(errorMessages);
                    });
                } else {
                    console.log(error);
                    return toast.error(error.message);
                }
            } else {
                return toast.success("Application submitted successfully!");
            }
            console.log(applicantData);
        } catch (error) {
            return toast.error("Internal Server Error");
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
        <form action={clientAction} className="flex flex-col mt-10">
            <div className="flex gap-10 text-white">
                <div className="flex flex-col flex-1 gap-5">
                    {applicantInputs.map(({ label, type, name }) => (
                        <div className="flex flex-col" key={name}>
                            <label className="text-lg font-semibold">{label}</label>
                            <input
                                type={type}
                                name={name}
                                className="input input-warning w-full text-black"
                            />
                        </div>
                    ))}

                    {/* THE INPUT BELOW IS THE IMAGE URL */}
                    {/* SO BASICALLY AFTER UPLOADING THE IMAGE */}
                    {/* IT WILL GO DIRECTLY TO THE EDGESTORE DATABASE SOMETHING LIKE THAT */}
                    {/* THEN FETCHING(GET) THE EDGESTORE DATABASE AND DISPLAY INTO THE INPUT BELOW */}
                    {/* SO THAT IT WILL GO TO OUR DATABASE TO SEE THE PDF FILE */}
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
                    <RadioButton
                        setSelectedPosition={(value: string) =>
                            setSelectedPosition(value as "teachingStaff" | "non-teachingStaff")
                        }
                    />

                    {selectedPosition === "teachingStaff" ? (
                        <div className="flex flex-col text-white">
                            <label className="text-lg font-semibold">Department</label>
                            <select name="teachingStaff" className="text-black rounded-md p-1.5">
                                {departments.map(({ department_id, department_name }) => (
                                    <option key={department_id} value={department_name}>
                                        {department_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ) : (
                        selectedPosition === "non-teachingStaff" && (
                            <div className="flex flex-col text-white">
                                <label className="text-lg font-semibold">Office</label>
                                <select
                                    name="non-teachingStaff"
                                    className="text-black rounded-md p-1.5"
                                >
                                    {Array.isArray(offices) &&
                                        offices.map(({ office_id, office_name }) => (
                                            <option key={office_id} value={office_name}>
                                                {office_name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        )
                    )}
                </div>

                <div className="flex-1">
                    <label>Upload your CV/RESUME</label>
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
                                                    updateFileProgress(
                                                        addedFileState.key,
                                                        "COMPLETE"
                                                    );
                                                }
                                            },
                                        });
                                        setUrls({
                                            url: res.url,
                                        });
                                    } catch (err) {
                                        updateFileProgress(addedFileState.key, "ERROR");
                                    }
                                })
                            );
                        }}
                    />
                </div>
            </div>

            <Button />
        </form>
    );
}

function RadioButton({ setSelectedPosition }: { setSelectedPosition: (value: string) => void }) {
    return (
        <div className="flex">
            <fieldset className="flex-1">
                <legend className="text-lg font-semibold mb-3">
                    Preferred mode of communication
                </legend>
                <CommunicationRadioButton
                    id="email"
                    value="Email"
                    name="communicationOption"
                    label="Email"
                />
                <CommunicationRadioButton
                    id="phone_number"
                    value="PhoneNumber"
                    name="communicationOption"
                    label="Phone Number"
                />
            </fieldset>

            <fieldset className="flex-1">
                <legend className="text-lg font-semibold mb-3">
                    What type are you applying for?
                </legend>
                <PositionOption
                    id="teaching_staff"
                    value="teachingStaff"
                    name="applyingType"
                    label="Teaching Staff"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setSelectedPosition(e.target.value)
                    }
                />
                <PositionOption
                    id="non-teaching_staff"
                    value="non-teachingStaff"
                    name="applyingType"
                    label="Non-Teaching Staff"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setSelectedPosition(e.target.value)
                    }
                />
            </fieldset>
        </div>
    );
}

export type CommunicationRadioButtonProps = {
    id: string;
    value: string;
    name: string;
    label: string;
};

function CommunicationRadioButton({ id, value, name, label }: CommunicationRadioButtonProps) {
    return (
        <div>
            <input type="radio" id={id} value={value} name={name} className="radio radio-error" />
            <label className="pl-2 cursor-pointer text-lg font-medium">{label}</label>
        </div>
    );
}

export type PositionOptionProps = {
    id: string;
    value: string;
    name: string;
    label: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

function PositionOption({ id, value, name, label, onChange }: PositionOptionProps) {
    return (
        <div>
            <input
                type="radio"
                id={id}
                value={value}
                name={name}
                onChange={onChange}
                className="radio radio-error"
            />
            <label className="pl-2 cursor-pointer text-lg font-medium">{label}</label>
        </div>
    );
}

function Button() {
    return (
        <button className="group w-32 mx-auto relative m-1 inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-lg border-b-2 border-l-2 border-r-2 border-red-950 bg-gradient-to-tr from-red-900 to-red-800 px-4 py-1 text-white shadow-lg transition duration-100 ease-in-out active:translate-y-0.5 active:border-red-700 active:shadow-none">
            <span className="absolute h-0 w-0 rounded-full bg-white opacity-10 transition-all duration-300 ease-out group-hover:h-32 group-hover:w-32"></span>
            <span className="relative font-medium">Syntax UI</span>
        </button>
    );
}
