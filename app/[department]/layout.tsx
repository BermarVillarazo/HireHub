import Logout from "@/components/Logout";
import DepartmentNavigation from "@/components/department/DepartmentNavigation";
import { validateRequest } from "@/lib/auth";
import Link from "next/link";
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
    else if (user && user?.departmentName !== user?.departmentName)
        return redirect(`/${user?.departmentName}/requests`);
    else if (user && user?.officeName !== user?.officeName)
        return redirect(`/${user?.officeName}/requests`);
    else if (user && user?.role === "recruitment_staff") return redirect("/recruitment_staff");
    else if (user && user?.role === "user") return redirect("/user");

    return (
        <div className="relative">
            {user && user?.role !== "user" && user?.role !== "recruitment_staff" && (
                <div className="bg-red-900 flex justify-between items-center h-20 w-full mx-auto px-10 text-white">
                    {/* Logo */}
                    <h1 className="w-full text-3xl font-bold">HireHub</h1>

                    {/* Desktop Navigation */}
                    <ul className="hidden md:flex">
                        <Links href={`/${params.department}/requests`} title="Requests" />
                        <Links href={`/${params.department}/applicants`} title="Applicant" />
                        <Links href={`/${params.department}/records`} title="Records" />
                    </ul>
                    <DepartmentNavigation department={params.department} />
                    <Logout />
                </div>
            )}
            {children}
        </div>
    );
}

type LinksProps = {
    href: string;
    title: string;
};

function Links({ href, title }: LinksProps) {
    return (
        <Link
            href={href}
            className="group relative m-1 inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-lg hover:border-red-900 bg-gradient-to-tr hover:from-red-700 hover:to-red-800 px-4 py-1 text-white hover:shadow-lg transition duration-100 ease-in-out active:translate-y-0.5 hover:scale-90 active:shadow-none font-bold"
        >
            {title}
        </Link>
    );
}
