import AdminForm from "@/components/AdminForm";
import Logout from "@/components/Logout";
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
