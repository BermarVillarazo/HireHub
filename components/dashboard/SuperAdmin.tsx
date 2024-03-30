import { Props } from "@/app/types/type";

export default function SuperAdmin({ user }: Props) {
    return (
        <>
            <h1>{user?.email}</h1>
            <h1>ROLE: {user?.role}</h1>
            <h1>SUPER ADMIN PAGE</h1>
        </>
    );
}
