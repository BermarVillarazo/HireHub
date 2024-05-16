import { getAllDeptartmentOrOfficeRequests } from "@/app/GET/GET";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { Title } from "../Title";

export default async function SidebarRequest({ department }: { department: string }) {
    const { departmentJobRequests } = await getAllDeptartmentOrOfficeRequests(department);

    revalidatePath(`${department}/requests`);

    return (
        <section className="flex flex-col gap-5 w-1/3 h-[100vh] py-5 px-4 sticky top-0 overflow-y-scroll overflow-x-hidden text-base-content">
            <Title title="REQUEST LISTS" />
            {departmentJobRequests.map(
                ({
                    request_id,
                    requested_position,
                    request_type,
                    request_qualification,
                    officeName,
                }) => (
                    <DisplayApplicant
                        key={request_id}
                        id={request_id}
                        department={department}
                        requested_position={requested_position}
                        request_type={request_type}
                        request_qualification={request_qualification}
                        officeName={officeName ?? ""}
                    />
                )
            )}
            {/* {officeJobRequests.map(
                ({
                    request_id,
                    requested_position,
                    request_type,
                    request_qualification,
                    officeName,
                }) => (
                    <DisplayApplicant
                        key={request_id}
                        id={request_id}
                        department={department}
                        requested_position={requested_position}
                        request_type={request_type}
                        request_qualification={request_qualification}
                        officeName={officeName ?? ""}
                    />
                )
            )} */}
        </section>
    );
}

type DisplayApplicantProps = {
    id: number;
    department: string;
    requested_position: string;
    request_type: string;
    request_qualification: string;
    officeName: string;
};

function DisplayApplicant({
    id,
    department,
    requested_position,
    request_type,
    request_qualification,
    officeName,
}: DisplayApplicantProps) {
    return (
        <div className="w-full p-3.5 bg-amber-500 hover:text-white hover:bg-red-900 rounded-lg cursor-pointer hover:scale-95 transition duration-200">
            <Link href={`/${department || officeName}/requests/${id}`} scroll={false}>
                <div className="overflow-hidden">
                    <h1 className="text-md font-semibold">{requested_position}</h1>
                    <h1 className="text-sm font-semibold">{request_type}</h1>
                    <p className="text-sm font-medium h-14">{request_qualification}</p>
                </div>
            </Link>
        </div>
    );
}
