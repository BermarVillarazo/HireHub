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
    else if (user && user?.role === "recruitment_staff") return redirect("/recruitment_staff");
    else if (user && user?.role !== "representative") {
        if (user?.departmentName) return redirect(`/${user?.departmentName}/requests`);
        else if (user?.officeName) return redirect(`/${user?.officeName}/requests`);
    }

    return (
        <div className="flex min-h-screen flex-col items-center ">
            {user && user?.role !== "user" && (
                <DepartmentNavigation department={params.department} />
            )}
            {children}
        </div>
    );
}
