import AdminForm from "@/components/AdminForm";
import Logout from "@/components/Logout";
import { getAllUsers } from "../lib/crud";

export default async function SuperAdmin() {
    const data = await getAllUsers();

    return (
        <>
            <AdminForm data={data} />
            <Logout />
        </>
    );
}
