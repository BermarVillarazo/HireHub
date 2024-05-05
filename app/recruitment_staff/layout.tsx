import RecruitmentStaffNavigation from "@/components/RecruitmentStaffNavigation";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ChildrenProps, RecruitmentStaffNavigationLinks } from "../types/type";
import Link from "next/link";
import Logout from "@/components/Logout";

export default async function layout({ children }: ChildrenProps) {
    const { user } = await validateRequest();

    // IF NO USER IS LOGGED IN, REDIRECT TO LOGIN PAGE
    if (!user) return redirect("/login");
    // IF USER IS LOGGED IN AND ROLE IS USER OR RECRUITMENT STAFF, REDIRECT TO RESPECTIVE DASHBOARD
    // SO REDIRECT TO /USER OR /RECRUITMENT_STAFF
    else if (user && user?.role !== "recruitment_staff") {
        return redirect("/recruitment_staff");
    }
    // TODO: ADD DEPARTMENT/OFFICE REDIRECT
    // EXAMPLE: /${DEPARTMENT} || /${OFFICE}/REQUESTS

    // IF USER IS LOGGED IN AND ROLE IS NOT USER OR RECRUITMENT STAFF, REDIRECT TO RESPECTIVE DASHBOARD
    // SO REDIRECT TO /${ROLE}/REQUESTS
    // EXAMPLE: /[DEPARTMENT] || [OFFICE]/REQUESTS

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