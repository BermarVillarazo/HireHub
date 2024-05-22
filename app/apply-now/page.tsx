import ApplicantForm from "@/components/applicant/ApplicantForm";
import { DepartmentSelect, OfficeSelect } from "@/lib/schema";
import { Suspense } from "react";

export default async function ApplyNow() {
    let departments: DepartmentSelect[] = [];
    try {
        const departmentsResponse = await fetch(
            `https://cit-application-tracker.vercel.app/api/recruitment_staff/department`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                cache: "no-cache",
            }
        );
        const department = await departmentsResponse.json();
        departments = department.departments;
    } catch (error) {
        console.log("Failed to fetch DEPARTMENT:", error);
    }

    let offices: OfficeSelect[] = [];
    try {
        const officeResponse = await fetch(
            `https://cit-application-tracker.vercel.app/api/recruitment_staff/office`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                cache: "no-cache",
            }
        );
        const office = await officeResponse.json();
        offices = office.offices;
    } catch (error) {
        console.log("Failed to fetch OFFICE:", error);
    }

    return (
        <section className="w-11/12 bg-orange-400 rounded-xl gap-10 text-white mx-auto p-5 sm:p-10 lg:p-16 xl:py2 xl:my-8">
            <h1 className="text-xl lg:text-2xl font-bold">APPLICANT INFORMATION</h1>
            <Suspense fallback={<>LOADING....</>}>
                <ApplicantForm departments={departments} offices={offices} />
            </Suspense>
        </section>
    );
}
