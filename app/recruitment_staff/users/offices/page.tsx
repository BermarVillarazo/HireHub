import Loading from "@/components/recruitment_staff/Loading";
import RecruitmentStaffUsersOfficePage from "@/components/recruitment_staff/RecruitmentStaffUsersOfficePage";
import { baseUrl } from "@/constants";
import { OfficeSelect, User } from "@/lib/schema";
import { Suspense } from "react";
import toast from "react-hot-toast";

const tableHead = [
    { name: "Name" },
    { name: "First Name" },
    { name: "Last Name" },
    { name: "Email" },
    { name: "Office" },
    { name: "Update Office" },
];

export default async function OfficesPage() {
    let officeUsers: User[] = [];
    try {
        const response = await fetch(`${baseUrl}/api/recruitment_staff/office/officeUsers`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-cache",
        });
        const data = await response.json();
        officeUsers = data.officeUsers;
    } catch (error) {
        console.log("Failed to fetch OFFICE USERS:", error);
        return toast.error("Failed to fetch OFFICE USERS");
    }

    let officeUpdate: OfficeSelect[] = [];
    try {
        const response = await fetch(`${baseUrl}/api/recruitment_staff/office`);
        const data = await response.json();
        officeUpdate = data.offices;
    } catch (error) {
        console.log("Failed to fetch OFFICES:", error);
        return toast.error("Failed to fetch OFFICE USERS");
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
                    <RecruitmentStaffUsersOfficePage
                        officeUsers={officeUsers}
                        officeUpdate={officeUpdate}
                    />
                </Suspense>
            </div>
        </div>
    );
}
