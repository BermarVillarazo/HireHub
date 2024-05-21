import RecruitmentStaffSubnavigation from "@/components/recruitment_staff/RecruitmentStaffSubnavigation";
import { ChildrenProps } from "@/types/type";

export default function layout({ children }: ChildrenProps) {
    return (
        <div>
            <RecruitmentStaffSubnavigation />
            {children}
        </div>
    );
}
