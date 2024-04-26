import { validateRequest } from "@/lib/auth";

export default async function SHS() {
    const { user } = await validateRequest();

    return (
        <div>
            <p>
                Role: <span className="font-bold">{user?.role}</span>
            </p>
            <p>
                Gmail: <span className="font-bold">{user?.email}</span>
            </p>
            <p>
                First Name: <span className="font-bold">{user?.firstName}</span>
            </p>
            <p>
                Last Name: <span className="font-bold">{user?.lastName}</span>
            </p>
        </div>
    );
}
