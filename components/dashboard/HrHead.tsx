import { Props } from "@/app/types/type";

export default function HrHead({ user }: Props) {
    return (
        <>
        
            <h1>{user?.email}</h1>
            <h1>ROLE: {user?.role}</h1>
        </>
    );
}
