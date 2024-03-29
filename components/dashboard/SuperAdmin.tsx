import { Props } from "@/app/types/type";
import Logout from "../ui/Logout";

export default function SuperAdmin({ user, params }: Props) {
    return (
        <>
            <h1>{params.slug} USER's POV ONLY</h1>
            <h1>{user?.email}</h1>
            <h1>ROLE: {user?.role}</h1>
            <Logout />
        </>
    );
}
