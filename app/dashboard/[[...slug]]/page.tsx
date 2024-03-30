import { Params } from "@/app/types/type";
import HrHead from "@/components/dashboard/HrHead";
import SuperAdmin from "@/components/dashboard/SuperAdmin";
import Logout from "@/components/ui/Logout";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page({ params }: Params) {
    const { user } = await validateRequest();

    if (!user) {
        return redirect("/login");
    }

    if (user?.role === "super_admin") {
        return <SuperAdmin user={user} params={params} />;
    }

    if (user?.role === "hr_head") {
        return <HrHead user={user} params={params} />;
    }

    return (
        <div>
            <h1>This is the default dynamic route</h1>
            <h1>Welcome, {user?.email}</h1>
            <h1>{user?.email} POV</h1>
            <h1>ROLE: "{user?.role}"</h1>
            <p>YOUR ACCOUNT HAS BEEN LOCKED</p>
            <Logout />
        </div>
    );
}
