import Logout from "@/components/Logout";
import AdminForm from "@/components/dashboard/SuperAdminDashoard";
import { getAllUsers } from "../lib/crud";

export default async function SuperAdmin() {
    const { users } = await getAllUsers();

    return (
        <>
            <AdminForm users={users} />
            <Logout />
        </>
    );
}
