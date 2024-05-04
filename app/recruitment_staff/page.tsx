import Logout from "@/components/Logout";
import AdminForm from "@/components/dashboard/SuperAdminDashoard";
import { getAllUsers } from "../GET/GET";

export default async function SuperAdmin() {
    const { users } = await getAllUsers();

    return (
        <>
            <AdminForm users={users} />
            <Logout />
        </>
    );
}
