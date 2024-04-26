import { UserProps } from "@/app/types/type";

export default function HrHead({ user }: UserProps) {
    return (
        <>
            <h1>{user?.email}</h1>
            <h1>ROLE: {user?.role}</h1>
        </>
    );
}
