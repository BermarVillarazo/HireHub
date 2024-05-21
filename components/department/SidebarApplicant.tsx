import { getAllApplicantsLists } from "@/GET/GET";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { Title } from "../Title";

export default async function SidebarApplicant({ department }: { department: string }) {
    const { departmentApplicants, officeApplicants } = await getAllApplicantsLists(department);

    revalidatePath(`${department}/requests`);

    return (
        <section className="flex flex-col gap-5 w-1/3 h-[100vh] py-5 px-4 sticky top-0 overflow-y-scroll overflow-x-hidden text-base-content">
            <Title title="APPLICANTS LISTS" />
            {departmentApplicants.map(
                ({ id, first_Name, last_Name, email, position, departmentName, officeName }) => (
                    <DisplayApplicant
                        key={id}
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
                ({ id, first_Name, last_Name, email, position, departmentName, officeName }) => (
                    <DisplayApplicant
                        key={id}
                        id={id}
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
    department,
    first_Name,
    last_Name,
    email,
    position,
    departmentName,
    officeName,
}: DisplayApplicantProps) {
    return (
        <div className="w-full p-3.5 bg-amber-500 hover:text-white hover:bg-red-900 rounded-lg cursor-pointer hover:scale-95 transition duration-200">
            <Link href={`/${department || officeName}/applicants/${id}`} scroll={false}>
                <div>
                    <h1 className="text-md font-semibold">
                        {first_Name} {last_Name}
                    </h1>
                    <h1 className="text-sm font-medium overflow-hidden">{email}</h1>
                    <p className="text-sm font-medium">{`${
                        position === "teachingStaff" && "Teaching Staff"
                    }`}</p>
                    <p className="text-sm font-medium">{departmentName || officeName}</p>
                </div>
            </Link>
        </div>
    );
}
