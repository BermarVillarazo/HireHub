import Logout from "@/components/Logout";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function User() {
    const { user } = await validateRequest();

    if (!user) return redirect("/login");
    else if ((user && user?.role === "hr_head") || user?.role === "super_admin") {
        return redirect(`/${user?.role}`);
    }  else if (user && !["user", "super_admin", "hr_head"].includes(user?.role)) {
        return redirect(`/${user?.role}/requests`);
    }

    return (
        <div className="relative flex items-center justify-center">
            <div className="flex flex-wrap items-center justify-center">
                <p className="text-sm leading-6 text-gray-900">
                    <strong className="font-semibold">HireHub</strong>
                    Your account has been created. Please wait/contact an admin for account
                    verification.
                </p>
                <Logout />
            </div>
        </div>
    );
}
