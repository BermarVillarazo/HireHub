"use client";

import { getAllApplicants } from "@/app/GET/GET";
import RequestsPage from "@/components/department/Requests";
import { ApplicantSelect } from "@/lib/schema";

export default async function Requests() {
    const applicants: ApplicantSelect[] = await getAllApplicants();

    return (
        <section className="w-full h-[90vh] mx-auto py-5 px-36 flex flex-row">
            <RequestsPage applicants={applicants} />
        </section>
    );
}

function Title({ title }: { title: string }) {
    return <h1 className="text-3xl font-bold">{title}</h1>;
}
