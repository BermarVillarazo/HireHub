import RecruitmentStaffNavigation from "@/components/RecruitmentStaffNavigation";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ChildrenProps } from "../types/type";

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
        <div>
            <RecruitmentStaffNavigation />
            {children}
        </div>
    );
}
