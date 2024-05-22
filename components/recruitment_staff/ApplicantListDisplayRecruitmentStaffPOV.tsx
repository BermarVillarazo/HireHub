"use client";

import { ApplicantSelect, RatingSelect } from "@/lib/schema";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, Fragment, useState } from "react";
import toast from "react-hot-toast";
import Button from "../Button";
import ConfirmationPopup from "../Modal";
import LabelInput from "../department/LabelInput";

import { baseUrl } from "@/constants";
import EmptyStar from "@/public/empty-star.svg";
import SolidStar from "@/public/solid-star.svg";
import Link from "next/link";

const stepsSequence = [
    "Screening",
    "Initial Interview",
    "TeachingDemo",
    "Pyschological Exam",
    "Panel Interview",
    "Recommendation for Hiring",
];

type stepsSequenceType = (typeof stepsSequence)[number];

type StatusUpdate = {
    status_name: string;
    rating: number;
};

type ApplicantListDisplayRecruitmentStaffPOVProps = {
    applicant: ApplicantSelect[];
    id: string;
    status: RatingSelect[];
};

export default function ApplicantListDisplayRecruitmentStaffPOV({
    applicant,
    id,
    status,
}: ApplicantListDisplayRecruitmentStaffPOVProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [showConfirmationMessage, setShowConfirmationMessage] = useState(false);
    const [formData, setFormData] = useState<StatusUpdate>();
    const [rating, setRating] = useState<number>(0);
    const [ratingImage, setRatingImage] = useState(null);
    const router = useRouter();

    const handleNextStep = () => {
        if (currentStep < stepsSequence.length - 1) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const updateStatus: StatusUpdate = {
            status_name: e.currentTarget.status_name.value,
            rating: Number(e.currentTarget.rating.value),
        };

        setFormData(updateStatus);
        setShowConfirmationMessage(true);
    };

    async function handleConfirmUpdateUserRole() {
        try {
            const response = await fetch(`${baseUrl}/api/applicant/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.status === 409) {
                return toast.error(data.message);
            } else if (data.status === 404) {
                return toast.error(data.message);
            }

            setRating(0);
            setShowConfirmationMessage(false);
            router.refresh();
            handleNextStep();
            return toast.success("Applicant status updated successfully.");
        } catch (error) {
            console.log(error);
            return toast.error("An error occurred. Please try again later.");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
            {applicant.map(
                ({
                    id,
                    first_Name,
                    last_Name,
                    email,
                    departmentName,
                    officeName,
                    position,
                    communication,
                    status,
                    resume,
                }) => (
                    <Fragment key={id}>
                        <section className="flex items-center gap-5">
                            <div className="bg-gray-300 h-24 w-24 rounded-full overflow-hidden"></div>
                            <div className="flex flex-col">
                                <h1 className="text-2xl font-bold">
                                    {first_Name} {last_Name}
                                </h1>
                                <Link href={resume!} target="_blank" className="underline text-blue-600 hover:text-black w-fit">
                                    Resume
                                </Link>
                            </div>
                        </section>
                        <div className="grid grid-cols-2 gap-5">
                            <LabelInput label="Email" value={email} />
                            <LabelInput label="Contact Number" value={communication} />
                            <LabelInput label="Preferred Communication Type" value={email} />
                            <LabelInput
                                label="Applied as"
                                value={`${position === "teachingStaff" && "Teaching Staff"}`}
                            />
                            {departmentName && (
                                <LabelInput label="Department" value={departmentName} />
                            )}
                            {officeName && <LabelInput label="Office" value={officeName} />}
                        </div>
                        <section className="flex flex-col gap-5 w-full">
                            <h1 className="font-bold"> APPLICATION STATUS </h1>
                            <div className="flex justify-around">
                                {stepsSequence.map((step, index) => (
                                    <div
                                        key={step}
                                        className="flex flex-col justify-center items-center gap-3"
                                    >
                                        <input
                                            type="radio"
                                            name="status_name"
                                            value={step}
                                            checked={step === stepsSequence[currentStep]}
                                            readOnly
                                            className={`radio radio-error ${
                                                index < currentStep
                                                    ? "bg-black"
                                                    : index === currentStep
                                                    ? "bg-white"
                                                    : ""
                                            }`}
                                            disabled={index !== currentStep}
                                        />
                                        <label className="text-sm">{`${
                                            step === "TeachingDemo" ? "Teaching Demo" : step
                                        }`}</label>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-center gap-10">
                                {[...Array(5)].map((star, index) => {
                                    const currentRate = index + 1;
                                    return (
                                        <label key={index}>
                                            <input
                                                type="radio"
                                                name="rating"
                                                value={currentRate}
                                                onClick={() => {
                                                    setRating(currentRate);
                                                    console.log(currentRate);
                                                }}
                                                className="w-10 text-black hidden "
                                            />
                                            {currentRate <= rating ? (
                                                <Image
                                                    src={SolidStar}
                                                    alt="Star icon"
                                                    width={40}
                                                    height={40}
                                                    priority
                                                    className="cursor-pointer text-red-900"
                                                />
                                            ) : (
                                                <Image
                                                    src={EmptyStar}
                                                    alt="Star icon"
                                                    width={40}
                                                    height={40}
                                                    priority
                                                    className="cursor-pointer"
                                                />
                                            )}
                                        </label>
                                    );
                                })}
                            </div>
                        </section>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <Button>UPDATE STATUS</Button>
                            <Link
                                href={`mailto:${email}`}
                                className="bg-red-900 w-40 hover:bg-red-800 text-white font-semibold py-3 px-5 rounded-xl shadow-lg transform hover:scale-105 transition duration-200 ease-in-out whitespace-nowrap"
                            >
                                SEND EMAIL
                            </Link>
                        </div>
                    </Fragment>
                )
            )}

            {showConfirmationMessage && (
                <ConfirmationPopup
                    message="Are you sure you want to update applicant status"
                    onCancel={() => setShowConfirmationMessage(false)}
                    onConfirm={handleConfirmUpdateUserRole}
                />
            )}
        </form>
    );
}

// type StatusNameProps = {
//     value: string;
// };

// function StatusName({ value }: StatusNameProps) {
//     return (
//         <div className="flex flex-col">
//             <input type="radio" name="status_name" value={value} className="radio radio-error" />
//         </div>
//     );
// }

// type RatingProps = {
//     name?: string;
//     value?: string;
//     disabled?: boolean;
// };

// function Rating({ name, value, disabled }: RatingProps) {
//     return (
//         <input
//             type="text"
//             name={name}
//             value={value}
//             maxLength={1}
//             readOnly
//             disabled={disabled}
//             className={`block w-9 h-9 p-2 text-sm font-extrabold text-center text-black bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500 ${
//                 disabled === true ? "bg-white/60" : "bg-white"
//             }`}
//         />
//     );
// }
