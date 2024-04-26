import SHSDepartmentNavigation from "@/components/DepartmentNavigation";
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

    if (!user) {
        return redirect("/login");
    } else if (user?.role === "super_admin" && params.department !== "super_admin") {
        return redirect("/super_admin");
    } else if (user?.role && params.department !== user?.role) {
        return redirect(`/${user?.role}`);
    }

    return (
        <div className="flex min-h-screen flex-col items-center bg-red-900">
            <SHSDepartmentNavigation />
            {children}
        </div>
    );
}
