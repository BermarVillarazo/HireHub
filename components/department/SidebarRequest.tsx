import { baseUrl } from "@/constants";
import { JobRequestSelect } from "@/lib/schema";
import Link from "next/link";
import { Title } from "../Title";

export default async function SidebarRequest({ department }: { department: string }) {
    let departmentJobRequests: JobRequestSelect[] = [];
    try {
        const response = await fetch(`${baseUrl}/api/representative/department/${department}`);
        const data = await response.json();
        departmentJobRequests = data.departmentRequests;
    } catch (error) {
        console.log("Failed to fetch DEPARTMENTS:", error);
    }

    let officeJobRequests: JobRequestSelect[] = [];
    try {
        const response = await fetch(`${baseUrl}/api/representative/office/${department}`);
        const data = await response.json();
        officeJobRequests = data.officeRequests;
    } catch (error) {
        console.log("Failed to fetch OFFICES:", error);
    }

    return (
        <section className="flex flex-col gap-5 w-1/3 h-[100vh] py-5 px-4 sticky top-0 overflow-y-scroll overflow-x-hidden text-base-content">
            <Title title="Request Lists" />
            {departmentJobRequests.map(
                (
                    {
                        request_id,
                        requested_position,
                        request_type,
                        request_qualification,
                        officeName,
                    },
                    index
                ) => (
                    <DisplayJobRequests
                        key={request_id}
                        index={index}
                        id={request_id}
                        department={department}
                        requested_position={requested_position}
                        request_type={request_type}
                        request_qualification={request_qualification}
                        officeName={officeName ?? ""}
                    />
                )
            )}
            {officeJobRequests.map(
                (
                    {
                        request_id,
                        requested_position,
                        request_type,
                        request_qualification,
                        officeName,
                    },
                    index
                ) => (
                    <DisplayJobRequests
                        key={request_id}
                        index={index}
                        id={request_id}
                        department={department}
                        requested_position={requested_position}
                        request_type={request_type}
                        request_qualification={request_qualification}
                        officeName={officeName ?? ""}
                    />
                )
            )}
        </section>
    );
}

type DisplayJobRequestsProps = {
    id: number;
    department: string;
    requested_position: string;
    request_type: string;
    request_qualification: string;
    officeName: string;
    index: number;
};

function DisplayJobRequests({
    id,
    department,
    requested_position,
    request_type,
    request_qualification,
    officeName,
    index,
}: DisplayJobRequestsProps) {
    return (
        <div className="w-full border-l-4 border-red-500 bg-gradient-to-l from-[#FAA916] to-[#FDDFA8] p-5 rounded-xl shadow-md hover:scale-95 duration-500 flex flex-col gap-5">
            <div className="flex gap-4 relative">
                <span className="font-bold text-xs p-2 flex items-center justify-center bg-white text-custom-yellow rounded-full absolute -right-2 -top-2">
                    {index < 10 ? "0" + (index + 1).toString() : index}
                </span>
                <div className="flex flex-col">
                    <span className="text-md font-bold">Position: {requested_position}</span>
                    <span className="text-sm text-slate-700">Type: {request_type}</span>
                    <span className="text-sm text-slate-700">
                        {decodeURIComponent(department || officeName)}
                    </span>
                </div>
            </div>
            <div className="relative group self-end font-semibold">
                <Link href={`/${department || officeName}/requests/${id}`} scroll={false}>
                    View details
                </Link>
                <div className="absolute left-0 bottom-0 w-0 h-[1px] bg-slate-700 rounded-xl group-hover:w-24 transition-all duration-300"></div>
            </div>
        </div>
    );
}
