"use client";

import { ApplicantSelect } from "@/lib/schema";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "../Button";

type RequestPageProps = {
    applicants: ApplicantSelect[];
    params: string;
};

export default function RequestsPage({ applicants, params }: RequestPageProps) {
    const router = useRouter();
    const [selectedID, setSelectedID] = useState<number | null>();
    const [selectedRequest, setSelectedRequest] = useState<ApplicantSelect | null>();

    function handleDetails(id: number) {
        console.log("Selected", id);
        const applicant = applicants.find((applicant) => applicant.id === id);
        setSelectedRequest(applicant);
        setSelectedID(id);
    }

    return (
        <>
            <section className="w-4/12 p-10 bg-gray-200 overflow-x-hidden">
                <h1 className="text-3xl font-bold">REQUEST LIST</h1>
                <div className="flex flex-col gap-5">
                    {applicants.map(({ id, first_Name, last_Name, email }) => (
                        <div
                            key={id}
                            className="w-full p-5 transition duration-300 bg-amber-500 rounded-lg hover:scale-95"
                            onClick={() => handleDetails(id)}
                        >
                            <h1 className="text-lg font-bold">
                                {first_Name}, {last_Name}, {email}
                            </h1>
                        </div>
                    ))}
                </div>
            </section>

            <section className="w-8/12 p-10 bg-gray-200">
                <h1 className="text-3xl font-bold">REQUEST DETAILS</h1>
                <section className="details-section w-full bg-black rounded-lg my-6 p-16 text-white flex flex-col gap-y-8">
                    {selectedRequest && (
                        <section>
                            <h1 className="text-xl font-bold">{selectedRequest.first_Name}</h1>
                            <p className="text-md">{selectedRequest.last_Name}</p>
                        </section>
                    )}
                </section>
                <section className="flex justify-end">
                    <Button>
                        <Link href={`/${params}/requests/form`}>Submit A New Request</Link>
                    </Button>
                </section>
            </section>
        </>
    );
}
