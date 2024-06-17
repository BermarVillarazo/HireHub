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
    "Psychological Exam",
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

    const handleRatingChange = (rating: number) => {
        setRating(rating);
    };

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
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <Link
                                href={`mailto:${email}`}
                                className="w-full md:w-64 py-3 px-14 rounded-lg text-white text-center bg-red-900 font-bold transition hover:scale-95 duration-200"
                            >
                                SEND EMAIL
                            </Link>
                            <Link 
                                href={`/recruitment_staff/evaluation`}
                                className="w-full md:w-64 py-3 px-14 rounded-lg text-white text-center bg-red-900 font-bold transition hover:scale-95 duration-200"
                            >
                                EVALUATE
                            </Link>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold mt-6">Evaluation</h2>
                            <div className="flex flex-col gap-3">
                                <LabelInput label="Current Step" value={stepsSequence[currentStep]} />
                                <div className="flex flex-col gap-3">
                                    <label className="font-semibold">Rating:</label>
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Image
                                                key={star}
                                                src={star <= rating ? SolidStar : EmptyStar}
                                                alt="star"
                                                width={24}
                                                height={24}
                                                onClick={() => handleRatingChange(star)}
                                                className="cursor-pointer"
                                            />
                                        ))}
                                    </div>
                                </div>
                                <label className="font-semibold">Status:</label>
                                <select
                                    name="status_name"
                                    className="border rounded px-3 py-2"
                                    required
                                >
                                    {stepsSequence.map((step, index) => (
                                        <option key={index} value={step}>
                                            {step}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </Fragment>
                )
            )}
            {showConfirmationMessage && (
                <ConfirmationPopup
                    message="Are you sure you want to update the applicant's status?"
                    onConfirm={handleConfirmUpdateUserRole}
                    onCancel={() => setShowConfirmationMessage(false)}
                />
            )}
            <Button type="submit">Submit Evaluation</Button>
        </form>
    );
}
