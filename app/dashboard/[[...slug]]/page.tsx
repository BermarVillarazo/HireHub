import { Params } from "@/app/types/type";
import HrHead from "@/components/dashboard/HrHead";
import SuperAdmin from "@/components/dashboard/SuperAdmin";
import User from "@/components/dashboard/User";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page({ params }: Params) {
    const { user } = await validateRequest();

    if (!user) {
        return redirect("/login");
    }

    if (user?.role === "user") {
        return <User user={user} params={params} />;
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
            <h1>{params.slug} POV</h1>

            <form action="/api/auth/logout" method="GET">
                <button>Logout</button>
            </form>
        </div>
    );
}
