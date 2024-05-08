import ApplicantForm from "@/components/applicant/ApplicantForm";
import { getAllDepartments, getAllOffices } from "../GET/GET";

export default async function ApplyNow() {
    const departments = await getAllDepartments();
    const offices = await getAllOffices();

    return (
        <section className="w-11/12 bg-orange-400 rounded-xl gap-10 text-white mx-auto p-5 sm:p-10 lg:p-16 xl:py2 xl:my-8">
            <h1 className="text-xl lg:text-2xl font-bold">APPLICANT INFORMATION</h1>
            <ApplicantForm departments={departments} offices={offices} />
        </section>
    );
}
