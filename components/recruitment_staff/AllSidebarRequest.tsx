import { baseUrl } from "@/constants";
import { JobRequestSelect } from "@/lib/schema";
import Link from "next/link";
import { Title } from "../Title";

type DepartmentJobRequest = {
    request_id: number;
    requested_position: string;
    request_type: string;
    request_description: string;
    request_qualification: string;
    departmentName: string;
    officeName: string;
    request_date: string;
    departmentId: number | null;
    officeId: number | null;
};

type OfficeJobRequest = {
    request_id: number;
    requested_position: string;
    request_type: string;
    request_description: string;
    request_qualification: string;
    departmentName: string;
    officeName: string;
    request_date: string;
    departmentId: number | null;
    officeId: number | null;
};

export default async function AllSidebarRequest() {
    let departmentJobRequests: DepartmentJobRequest[] = [];
    let officeJobRequests: OfficeJobRequest[] = [];

    try {
        const departmentResponse = await fetch(`${baseUrl}/api/representative/department`);
        const departmentData = await departmentResponse.json();
        departmentJobRequests = departmentData.departmentJobRequests;
    } catch (error) {
        console.log("Failed to fetch DEPARTMENT JOB REQUESTS:", error);
    }

    try {
        const officeResponse = await fetch(`${baseUrl}/api/representative/office`);
        const officeData = await officeResponse.json();
        officeJobRequests = officeData.officeJobRequests;
    } catch (error) {
        console.log("Failed to fetch OFFICE JOB REQUESTS:", error);
    }

    const allJobRequests = [...departmentJobRequests, ...officeJobRequests];

    return (
        <section className="flex flex-col gap-5 w-1/3 h-[100vh] py-5 px-4 sticky top-0 overflow-y-scroll overflow-x-hidden text-base-content">
            <Title title="All Job Requests" />
            {allJobRequests.map(
                (
                    {
                        request_id,
                        requested_position,
                        request_type,
                        request_description,
                        request_qualification,
                        departmentName,
                        officeName,
                        request_date,
                    },
                    index
                ) => (
                    <DisplayJobRequests
                        key={request_id}
                        index={index}
                        id={request_id}
                        requested_position={requested_position}
                        request_type={request_type}
                        request_description={request_description}
                        request_qualification={request_qualification}
                        departmentName={departmentName}
                        officeName={officeName}
                        request_date={request_date}
                    />
                )
            )}
        </section>
    );
}

type DisplayJobRequestsProps = {
    id: number;
    requested_position: string;
    request_type: string;
    request_description: string;
    request_qualification: string;
    departmentName: string;
    officeName: string;
    request_date: string;
    index: number;
};

function DisplayJobRequests({
    id,
    requested_position,
    request_type,
    request_description,
    request_qualification,
    departmentName,
    officeName,
    request_date,
    index,
}: DisplayJobRequestsProps) {
    const basePath = departmentName || officeName;
    const encodedPath = encodeURIComponent(basePath);
    const linkPath = `/recruitment_staff/requests/${id}`;

    return (
        <div className="w-full border-l-4 border-red-500 bg-gradient-to-l from-[#FAA916] to-[#FDDFA8] p-5 rounded-xl shadow-md hover:scale-95 duration-500 flex flex-col gap-5">
            <div className="flex gap-4 relative">
                <span className="font-bold text-xs p-2 flex items-center justify-center bg-white text-custom-yellow rounded-full absolute -right-2 -top-2">
                    {index < 10 ? "0" + (index + 1).toString() : index}
                </span>
                <div className="flex flex-col">
                    <span className="text-md font-bold">Position: {requested_position}</span>
                    <span className="text-sm text-slate-700">Type: {request_type}</span>
                    <span className="text-sm text-slate-700">Description: {request_description}</span>
                    <span className="text-sm text-slate-700">Qualification: {request_qualification}</span>
                    <span className="text-sm text-slate-700">
                        {departmentName || officeName}
                    </span>
                    <span className="text-sm text-slate-700">Date: {new Date(request_date).toLocaleDateString()}</span>
                </div>
            </div>
            <div className="relative group self-end font-semibold">
                <Link href={linkPath} scroll={false}>
                    View details
                </Link>
                <div className="absolute left-0 bottom-0 w-0 h-[1px] bg-slate-700 rounded-xl group-hover:w-24 transition-all duration-300"></div>
            </div>
        </div>
    );
}
