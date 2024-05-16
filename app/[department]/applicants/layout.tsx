import SidebarApplicant from "@/components/department/SidebarApplicant";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

type LayoutProps = {
    children: ReactNode;
    params: { department: string };
};

export default async function layout({ children, params }: LayoutProps) {
    const { user } = await validateRequest();

    if (!user) return redirect("/login");
    else if (user && user?.departmentName !== user?.departmentName)
        return redirect(`/${user?.departmentName}/requests`);
    else if (user && user?.officeName !== user?.officeName)
        return redirect(`/${user?.officeName}/requests`);
    else if (user && user?.role === "recruitment_staff") return redirect("/recruitment_staff");
    else if (user && user?.role === "user") return redirect("/user");

    return (
        <main className="flex max-w-screen-xl mx-auto">
            <SidebarApplicant department={params.department} />
            {children}
        </main>
    );
}
