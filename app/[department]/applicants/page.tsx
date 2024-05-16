import { getAllApplicantsLists } from "@/app/GET/GET";
import { DepartmentProps } from "@/app/types/type";
import ApplicantsList from "@/components/department/ApplicantsList";

export default async function Applicants({ params }: DepartmentProps) {
    const { departmentApplicants, officeApplicants } = await getAllApplicantsLists(
        params.department
    );

    return (
        <section className="w-11/12 flex flex-row gap-10 mx-auto p-5">
            <ApplicantsList applicants={departmentApplicants || officeApplicants} />
        </section>
    );
}
