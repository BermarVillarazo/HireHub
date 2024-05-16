import Logout from "@/components/Logout";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function User() {
    const { user } = await validateRequest();

    if (!user) return redirect("/login");
    else if (user && user?.departmentName) return redirect(`/${user.departmentName}/requests`);
    else if (user && user?.officeName) return redirect(`/${user.officeName}/requests`);
    else if (user && user?.role === "recruitment_staff") return redirect("/recruitment_staff");
    else if (user && user?.role !== "user") return redirect("/user");

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
