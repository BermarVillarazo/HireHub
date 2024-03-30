import { Props } from "@/app/types/type";
import Logout from "../ui/Logout";

export default function VpAdmin({ user }: Props) {
    return (
        <>
            <h1>{user?.email}</h1>
            <h1>ROLE: {user?.role}</h1>
        </>
    );
}
