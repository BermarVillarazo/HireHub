import ApplicantForm from "@/components/applicant/ApplicantForm";
import { getAllDepartments, getAllOffices } from "../GET/GET";

export default async function ApplyNow() {
    const { departments } = await getAllDepartments();
    const { offices } = await getAllOffices();

    return (
        <section className="w-10/12 bg-orange-400 rounded-xl gap-10 text-white mx-auto p-16 m-10">
            <h1 className="text-2xl font-bold">APPLICANT INFORMATION</h1>
            <ApplicantForm departments={departments} offices={offices} />
        </section>
    );
}
