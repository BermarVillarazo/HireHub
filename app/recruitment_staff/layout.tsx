import Logout from "@/components/Logout";
import RecruitmentStaffNavigation from "@/components/RecruitmentStaffNavigation";
import { validateRequest } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ChildrenProps, RecruitmentStaffNavigationLinks } from "../types/type";

export default async function layout({ children }: ChildrenProps) {
    const { user } = await validateRequest();

    if (!user) return redirect("/login");
    else if (user && user?.role === "user") return redirect("/user");
    else if (user && user?.role === "representative") {
        if (user?.departmentName) return redirect(`/${user?.departmentName}/requests`);
        else if (user?.officeName) return redirect(`/${user?.officeName}/requests`);
    }

    return (
        <>
            <div className="bg-red-900 flex justify-between items-center h-20 w-full mx-auto px-10 text-white">
                {/* Logo */}
                <h1 className="w-full text-3xl font-bold">HireHub</h1>

                {/* Desktop Navigation */}
                <ul className="hidden md:flex">
                    {RecruitmentStaffNavigationLinks.map(({ href, name }) => (
                        <Link
                            key={href}
                            href={href}
                            className="group relative m-1 inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-lg hover:border-red-900 bg-gradient-to-tr hover:from-red-700 hover:to-red-800 px-4 py-1 text-white hover:shadow-lg transition duration-100 ease-in-out active:translate-y-0.5 hover:scale-90 active:shadow-none font-bold"
                        >
                            {name}
                        </Link>
                    ))}
                </ul>
                <RecruitmentStaffNavigation />
                <Logout />
            </div>
            {children}
        </>
    );
}
