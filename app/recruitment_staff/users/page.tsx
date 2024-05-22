import Loading from "@/components/recruitment_staff/Loading";
import RecruitmentStaffUsersPage from "@/components/recruitment_staff/RecruitmentStaffUsersPage";
import { baseUrl } from "@/constants";
import { DepartmentSelect, OfficeSelect, User } from "@/lib/schema";
import { Suspense } from "react";

const tableHead = [
    { name: "Name" },
    { name: "First Name" },
    { name: "Last Name" },
    { name: "Email" },
    { name: "Role" },
    { name: "Department" },
    { name: "Office" },
];

export default async function RecruitmentStaff() {
    let users: User[] = [];
    try {
        const response = await fetch(`${baseUrl}/api/users`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-cache",
        });
        const data = await response.json();
        users = data.users;
    } catch (error) {
        console.log("Failed to fetch USERS:", error);
    }

    let departments: DepartmentSelect[] = [];
    try {
        const response = await fetch(`${baseUrl}/api/recruitment_staff/department`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-cache",
        });
        const data = await response.json();
        departments = data.departments;
    } catch (error) {
        console.log("Failed to fetch DEPARTMENTS:", error);
    }

    let offices: OfficeSelect[] = [];
    try {
        const response = await fetch(`${baseUrl}/api/recruitment_staff/office`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-cache",
        });
        const data = await response.json();
        offices = data.offices;
    } catch (error) {
        console.log("Failed to fetch OFFICES:", error);
    }

    return (
        <div className="w-full">
            <div className="w-full overflow-x-auto pb-10">
                <div className="grid grid-cols-8 text-center border p-2 font-semibold">
                    {tableHead.map(({ name }) => (
                        <p key={name}>{name}</p>
                    ))}
                </div>
                <Suspense fallback={<Loading />}>
                    <RecruitmentStaffUsersPage
                        users={users}
                        departments={departments}
                        offices={offices}
                    />
                </Suspense>
            </div>
        </div>
    );
}
