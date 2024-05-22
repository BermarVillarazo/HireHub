import { getAllApplicantsLists } from "@/GET/GET";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { Title } from "../Title";

export default async function SidebarApplicant({ department }: { department: string }) {
    const { departmentApplicants, officeApplicants } = await getAllApplicantsLists(department);

    revalidatePath(`${department}/requests`);

    return (
        <section className="flex flex-col gap-5 w-1/3 h-[100vh] py-5 px-4 sticky top-0 overflow-y-scroll overflow-x-hidden text-base-content">
            <Title title="Applicants" />
            {departmentApplicants.map(
                ({ id, first_Name, last_Name, email, position, departmentName, officeName }, index) => (
                    <DisplayApplicant
                        key={id}
                        index={index}
                        id={id}
                        department={department}
                        first_Name={first_Name ?? ""}
                        last_Name={last_Name ?? ""}
                        email={email}
                        position={position ?? ""}
                        departmentName={departmentName ?? ""}
                        officeName={officeName ?? ""}
                    />
                )
            )}
            {officeApplicants.map(
                ({ id, first_Name, last_Name, email, position, departmentName, officeName }, index) => (
                    <DisplayApplicant
                        key={id}
                        id={id}
                        index={index}
                        department={department}
                        first_Name={first_Name ?? ""}
                        last_Name={last_Name ?? ""}
                        email={email}
                        position={position}
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
    department: string;
    first_Name: string;
    last_Name: string;
    email: string;
    position: string;
    departmentName: string;
    officeName: string;
};

function DisplayApplicant({
    id,
    index,
    department,
    first_Name,
    last_Name,
    email,
    position,
    departmentName,
    officeName,
}: DisplayApplicantProps) {
    return (
        <div className="w-full border-l-4 border-red-500 bg-gradient-to-l from-[#FAA916] to-[#FDDFA8] p-5 rounded-xl shadow-md hover:scale-95 duration-500 flex flex-col gap-5">
            <div className="flex gap-4 relative">
                <span className="font-bold text-xs p-2 flex items-center justify-center bg-white text-custom-yellow rounded-full absolute -right-2 -top-2">
                    {index < 10 ? "0" + (index + 1).toString() : index}
                </span>
                <div className="flex flex-col">
                    <span className="text-md font-bold">{first_Name}</span>
                    <span className="text-sm text-slate-700">{last_Name}</span>
                    <span className="text-sm text-slate-700">
                        {decodeURIComponent(department || officeName)}
                    </span>
                </div>
            </div>
            <div className="relative group self-end font-semibold">
                <Link href={`/${department || officeName}/applicants/${id}`} scroll={false}>
                    View details
                </Link>
                <div className="absolute left-0 bottom-0 w-0 h-[1px] bg-slate-700 rounded-xl group-hover:w-24 transition-all duration-300"></div>
            </div>
        </div>
    );
}
