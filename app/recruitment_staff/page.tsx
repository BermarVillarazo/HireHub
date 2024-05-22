import ApplicantsChart from "@/components/recruitment_staff/charts/ApplicantsChart";
import { baseUrl } from "@/constants";
import { ApplicantSelect, DepartmentSelect, OfficeSelect } from "@/lib/schema";
import { HighlightProps } from "@/types/type";
import { Suspense } from "react";

export default async function Dashboard() {
    let applicantsUser: ApplicantSelect[] = [];
    try {
        const response = await fetch(`${baseUrl}/api/recruitment_staff/applicant`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-cache",
        });
        const applicants = await response.json();
        applicantsUser = applicants.applicants;
    } catch (error) {
        console.error("Error fetching APPLICANTS:", error);
    }
    const totalApplicants = applicantsUser.length;

    let department: DepartmentSelect[] = [];
    try {
        const departmentResponse = await fetch(`${baseUrl}/api/representative/department`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-cache",
        });
        const departmentData = await departmentResponse.json();
        department = departmentData.departmentJobRequests;
    } catch (error) {
        console.error("Error fetching DEPARTMENTS:", error);
    }

    let office: OfficeSelect[] = [];
    try {
        const officeResponse = await fetch(`${baseUrl}/api/representative/office`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-cache",
        });
        const officeData = await officeResponse.json();
        office = officeData.officeJobRequests;
    } catch (error) {
        console.error("Error fetching OFFICES:", error);
    }

    const totalDepartmentJobRequests = department.length + office.length;

    const highlightData = [
        {
            title: "Total Employees",
            value: totalApplicants,
        },
        {
            title: "Total Applicants",
            value: totalApplicants,
        },
        {
            title: "Job View",
            value: totalApplicants,
        },
        {
            title: "Job Requests",
            value: totalDepartmentJobRequests,
        },
    ];

    // bar chart
    const data = {
        labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
        ], // y-axis
        datasets: [
            {
                label: "My First Dataset",
                data: [0, 0, 0, 0, totalApplicants], // x-axis
                backgroundColor: "black",
                borderColor: "black",
                borderWidth: 1,
            },
        ],
        backgroundColor: "black",
        borderColor: "black",
        borderWidth: 1,
    };

    return (
        <section className="py-14">
            <section className="w-10/12 mx-auto flex flex-row gap-x-8">
                <Suspense fallback={<div className="loading loading-spinner loading-lg"></div>}>
                    {highlightData.map(({ title, value }) => (
                        <Highlight key={title} title={title} value={value} />
                    ))}
                </Suspense>
            </section>
            <section>
                <div className="w-10/12 h-[70vh] mx-auto rounded-lg my-8 bg-amber-500 flex">
                    <div className="w-full h-full p-5 flex justify-center">
                        <ApplicantsChart data={data} />
                    </div>
                </div>
            </section>
        </section>
    );
}

function Highlight({ title, value }: HighlightProps) {
    return (
        <div className="w-1/4 p-5 rounded-lg bg-amber-500">
            <h1 className="text-lg font-bold">{title}</h1>
            <p className="text-5xl font-bold">{value}</p>
        </div>
    );
}
