import { Title } from "@/components/Title";
import { baseUrl } from "@/constants";
import { DepartmentSelect } from "@/lib/schema";
import Image from "next/image";

type DepartmentProps = {
    params: {
        department: string;
    };
};

export default async function Applicants({ params }: DepartmentProps) {
    let department: DepartmentSelect[] = [];
    try {
        const response = await fetch(
            `${baseUrl}/api/representative/department/applicants/${params}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                cache: "no-cache",
            }
        );
        const data = await response.json();
        department = data.departmentCode;
    } catch (error) {
        console.log("Failed to fetch api from FRONTEND");
    }

    return (
        <section className="w-full p-5">
            <section className="flex justify-between items-center">
                <Title title="Request Details" />
            </section>
            <section className="details-section w-full bg-gradient-to-r from-[#7F0000] to-[#d9a5a5] rounded-2xl mt-5 text-white flex flex-col gap-y-4 items-center shadow-2xl">
                <Image src="/Checklist-pana.svg" width={300} height={300} alt="Checklist" />
                <div className="w-full bg-white text-slate-700 p-6 rounded-b-2xl">
                    <h1 className="text-left font-bold text-3xl mb-2">Welcome!</h1>
                    <p className="text-slate-500 mb-6">
                        Here, you can view, manage, and track all the applicants requests.
                    </p>
                </div>
            </section>
        </section>
    );
}
