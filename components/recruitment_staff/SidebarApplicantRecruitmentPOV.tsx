import { getAllApplicants } from "@/GET/GET";
import Link from "next/link";
import { Title } from "../Title";

export default async function SidebarApplicantRecruitmentPOV() {
    const applicants = await getAllApplicants();

    return (
        <section className="flex flex-col gap-5 w-1/3 h-[100vh] py-5 px-4 sticky top-0 overflow-y-scroll overflow-x-hidden text-base-content">
            <Title title="APPLICANTS LISTS" />
            {applicants.map(
                ({
                    id,
                    first_Name,
                    last_Name,
                    email,
                    contactNumber,
                    departmentName,
                    officeName,
                }, index) => (
                    <DisplayApplicant
                    index={index}
                        key={id}
                        id={id}
                        first_Name={first_Name ?? ""}
                        last_Name={last_Name ?? ""}
                        email={email}
                        contactNumber={contactNumber!}
                        departmentName={departmentName ?? ""}
                        officeName={officeName ?? ""}
                    />
                )
            )}
        </section>
    );
}

type DisplayApplicantProps = {
    id: number;
    index: number;
    first_Name: string;
    last_Name: string;
    email: string;
    contactNumber: number;
    departmentName: string;
    officeName: string;
};

function DisplayApplicant({
    id,
    index,
    first_Name,
    last_Name,
    email,
    contactNumber,
    departmentName,
    officeName,
}: DisplayApplicantProps) {
    return (
        // <div className="w-full p-3.5 bg-amber-500 hover:text-white hover:bg-red-900 rounded-lg cursor-pointer hover:scale-95 transition duration-200">
        //     <Link href={`/recruitment_staff/applicant/${id}`} scroll={false}>
        //         <div>
        //             <h1 className="text-md font-semibold">
        //                 {first_Name} {last_Name}
        //             </h1>
        //             <h1 className="text-sm font-medium overflow-hidden">{email}</h1>
        //             <p className="text-sm font-medium">{contactNumber}</p>
        //             <p className="text-sm font-medium">{departmentName || officeName}</p>
        //         </div>
        //     </Link>
        // </div>
        <div className="w-full border-l-4 border-red-500 bg-gradient-to-l from-[#FAA916] to-[#FDDFA8] p-5 rounded-xl shadow-md hover:scale-95 duration-500 flex flex-col gap-5">
            <div className="flex gap-4 relative">
                <span className="font-bold text-xs p-2 flex items-center justify-center bg-white text-custom-yellow rounded-full absolute -right-2 -top-2">
                    {index < 10 ? "0" + (index + 1).toString() : index}
                </span>
                <div className="flex flex-col">
                    <span className="text-md font-bold">
                        {first_Name} {last_Name}
                    </span>
                    <span className="text-sm text-slate-700">{contactNumber}</span>
                    <span className="text-sm text-slate-700">{email}</span>
                    <span className="text-sm text-slate-700">
                        {decodeURIComponent(departmentName || officeName)}
                    </span>
                </div>
            </div>
            <div className="relative group self-end font-semibold">
                <Link href={`/recruitment_staff/applicant/${id}`} scroll={false}>
                    View details
                </Link>
                <div className="absolute left-0 bottom-0 w-0 h-[1px] bg-slate-700 rounded-xl group-hover:w-24 transition-all duration-300"></div>
            </div>
        </div>
    );
}
