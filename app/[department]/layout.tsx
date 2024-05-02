import DepartmentNavigation from "@/components/department/DepartmentNavigation";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function layout({
    children,
    params,
}: {
    children: ReactNode;
    params: { department: string };
}) {
    const { user } = await validateRequest();

    if (!user) return redirect("/login");
    else if (
        (user && user?.role === "user") ||
        user?.role === "hr_head" ||
        user?.role === "super_admin"
    ) {
        return redirect(`/${user?.role}`);
    } else if (user && params.department !== user?.role) return redirect(`/${user?.role}/requests`);

    return (
        <div className="flex min-h-screen flex-col items-center ">
            {user && user?.role !== "user" && <DepartmentNavigation />}
            {children}
        </div>
    );
}
