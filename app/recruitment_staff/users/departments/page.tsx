import Loading from "@/components/recruitment_staff/Loading";
import RecruitmentStaffUsersDepartmentPage from "@/components/recruitment_staff/RecruitmentStaffUsersDepartment";
import { baseUrl } from "@/constants";
import { DepartmentSelect, User } from "@/lib/schema";
import { Suspense } from "react";
import toast from "react-hot-toast";

const tableHead = [
    { name: "Name" },
    { name: "First Name" },
    { name: "Last Name" },
    { name: "Email" },
    { name: "Department" },
    { name: "Update Department" },
];

export default async function DepartmentsPage() {
    let departmentUsers: User[] = [];
    try {
        const response = await fetch(`${baseUrl}/api/recruitment_staff/department/departmentUsers`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-cache",
        });
        const data = await response.json();
        departmentUsers = data.departmentUsers;
    } catch (error) {
        console.log("Failed to fetch DEPARTMENT USERS:", error);
        return toast.error("Failed to fetch DEPARTMENT USERS");
    }

    let departmentUpdate: DepartmentSelect[] = [];
    try {
        const response = await fetch(`${baseUrl}/api/recruitment_staff/department`);
        const data = await response.json();
        departmentUpdate = data.departments;
    } catch (error) {
        console.log("Failed to fetch DEPARTMENTS:", error);
    }


    return (
        <div className="w-full">
            <div className="w-full overflow-x-auto pb-10">
                <div className="grid grid-cols-7 text-center border p-2 font-semibold">
                    {tableHead.map(({ name }) => (
                        <p key={name}>{name}</p>
                    ))}
                </div>
                <Suspense fallback={<Loading />}>
                    <RecruitmentStaffUsersDepartmentPage
                        departmentUsers={departmentUsers}
                        departmentUpdate={departmentUpdate}
                    />
                </Suspense>
            </div>
        </div>
    );
}
