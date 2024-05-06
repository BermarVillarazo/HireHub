import { getAllDepartments, getAllOffices, getAllUsers } from "@/app/GET/GET";
import RecruitmentStaffDashboard from "@/components/dashboard/RecruitmentStaffDashboard";

export default async function RecruitmentStaff() {
	const { users } = await getAllUsers();
	const { departments } = await getAllDepartments();
	const { offices } = await getAllOffices();

	return (
		<RecruitmentStaffDashboard
			users={users}
			departments={departments}
			offices={offices}
		/>
	);
}
