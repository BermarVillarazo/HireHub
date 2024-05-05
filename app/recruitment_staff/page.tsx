import RecruitmentStaffDashboard from "@/components/dashboard/RecruitmentStaffDashboard";
import { getAllDepartments, getAllOffices, getAllUsers } from "../GET/GET";

export default async function RecruitmentStaff() {
    const { users } = await getAllUsers();
    const { departments } = await getAllDepartments();
    const { offices } = await getAllOffices();

    return <RecruitmentStaffDashboard users={users} departments={departments} offices={offices} />;
}
