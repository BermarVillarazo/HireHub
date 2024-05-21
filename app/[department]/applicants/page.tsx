import { getAllApplicantsLists } from "@/GET/GET";
import ApplicantsList from "@/components/department/ApplicantsList";
import { DepartmentProps } from "@/types/type";

export default async function Applicants({ params }: DepartmentProps) {
    // const { departmentApplicants, officeApplicants } = await getAllApplicantsLists(
    //     params.department
    // );

    return (
        <section className="w-11/12 flex flex-row gap-10 mx-auto p-5">
            DEFAULT DISPLAY
            {/* <ApplicantsList applicants={departmentApplicants || officeApplicants} /> */}
        </section>
    );
}
