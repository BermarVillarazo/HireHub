"use client";

import { useEdgeStore } from "@/lib/edgestore";
import { ApplicantInsert, DepartmentSelect, OfficeInsert, OfficeSelect } from "@/lib/schema";
import { TitleProps } from "@/types/type";
import { ChangeEvent, Suspense, useState } from "react";
import toast from "react-hot-toast";
import SuccessfulModal from "../SuccessfulModal";
import { FileState, MultiFileDropzone } from "../multi-file-dropzone";

type ApplicantFormProps = {
    departments: DepartmentSelect[];
    offices: OfficeSelect[];
};

const applicantInputs = [
    { label: "First Name", type: "text", name: "first_name" },
    { label: "Last Name", type: "text", name: "last_name" },
    { label: "Email", type: "email", name: "email" },
    { label: "Contact Number", type: "number", name: "contact_number" },
] as const;

export default function ApplicantForm({ departments, offices }: ApplicantFormProps) {
    const [selectedPosition, setSelectedPosition] = useState<
        "teachingStaff" | "non-teachingStaff"
    >();
    const [isSuccessfulApplication, setIsSuccessfulApplication] = useState(false);

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
                setIsSuccessfulApplication(true);
            }
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
        <div>
            <form action={clientAction} className="flex flex-col mt-5 lg:mt-10">
                <div className="flex flex-col xl:flex-row gap-8 xl:gap-10 text-white">
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

                        {url && (
                            <input
                                type="text"
                                value={url.url}
                                readOnly
                                name="resume_url"
                                className="hidden"
                            />
                        )}

                        <RadioButton
                            setSelectedPosition={(value: string) =>
                                setSelectedPosition(value as "teachingStaff" | "non-teachingStaff")
                            }
                        />

                        {selectedPosition === "teachingStaff" ? (
                            <div className="flex flex-col text-white">
                                <label className="text-lg font-semibold">Department</label>
                                <select name="teachingStaff" className="text-black rounded-md p-2">
                                    {departments.map(({ department_id, department_name }) => (
                                        <Suspense key={department_id} fallback={<>Loading...</>}>
                                            <option value={department_name}>
                                                {department_name}
                                            </option>
                                        </Suspense>
                                    ))}
                                </select>
                            </div>
                        ) : (
                            selectedPosition === "non-teachingStaff" && (
                                <div className="flex flex-col text-white">
                                    <label className="text-lg font-semibold">Office</label>
                                    <select
                                        name="non-teachingStaff"
                                        className="text-black rounded-md p-2"
                                    >
                                        {offices.map(({ office_id, office_name }) => (
                                            <Suspense key={office_name} fallback={<>Loading...</>}>
                                                <option value={office_name}>{office_name}</option>
                                            </Suspense>
                                        ))}
                                    </select>
                                </div>
                            )
                        )}
                    </div>

                    <div className="flex-1">
                        <Legend title="Upload your CV/RESUME" />
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
                                                    updateFileProgress(
                                                        addedFileState.key,
                                                        progress
                                                    );
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

                <Button title="Submit Application" />
            </form>

            {isSuccessfulApplication && <SuccessfulModal setOpen={setIsSuccessfulApplication} />}
        </div>
    );
}

function RadioButton({ setSelectedPosition }: { setSelectedPosition: (value: string) => void }) {
    return (
        <div className="flex flex-col lg:flex-row">
            <fieldset className="flex-1">
                <Legend title="Preferred mode of communication" />
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
                <Legend title="What type are you applying for?" />
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

function Legend({ title }: TitleProps) {
    return <legend className="text-lg font-semibold">{title}</legend>;
}

export type CommunicationRadioButtonProps = {
    id: string;
    value: string;
    name: string;
    label: string;
};

function CommunicationRadioButton({ id, value, name, label }: CommunicationRadioButtonProps) {
    return (
        <div className="flex items-center my-5">
            <label className="flex justify-center gap-2 cursor-pointer text-md lg:text-lg font-medium">
                <input
                    type="radio"
                    id={id}
                    value={value}
                    name={name}
                    className="radio radio-error"
                />
                {label}
            </label>
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
        <div className="flex items-center my-5">
            <label className="flex justify-center gap-2 cursor-pointer text-md lg:text-lg font-medium">
                <input
                    type="radio"
                    id={id}
                    value={value}
                    name={name}
                    onChange={onChange}
                    className="radio radio-error"
                />
                {label}
            </label>
        </div>
    );
}

function Button({ title }: TitleProps) {
    return (
        <button className="w-full xl:w-1/4 p-3 rounded-lg text-center bg-red-900 font-bold mx-auto mt-10 transform hover:scale-95 duration-200">
            {title}
        </button>
    );
}
