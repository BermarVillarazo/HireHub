export default async function Applicants() {
    // const { departmentApplicants, officeApplicants } = await getAllApplicantsLists(
    //     params.department
    // );

    // let departmentApplicants: ApplicantSelect[] = [];
    // let officeApplicants: ApplicantSelect[] = [];

    // try {
    //     const departmentResponse = await fetch(
    //         `https://cit-application-tracker.vercel.app/api/representative/department/applicants/${params.department}`
    //     );
    //     const department = await departmentResponse.json();
    //     departmentApplicants = department.applicants;
    // } catch (error) {
    //     console.log("Failed to fetch DEPARTMENTS:", error);
    // }

    // try {
    //     const officeResponse = await fetch(
    //         `https://cit-application-tracker.vercel.app/api/representative/office/applicants/${params.department}`
    //     );
    //     const office = await officeResponse.json();
    //     officeApplicants = office.applicants;
    // } catch (error) {
    //     console.log("Failed to fetch OFFICES:", error);
    // }

    return (
        <section className="w-11/12 flex flex-row gap-10 mx-auto p-5">
            DEFAULT DISPLAY
            {/* <ApplicantsList applicants={departmentApplicants || officeApplicants} /> */}
        </section>
    );
}
