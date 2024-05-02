import ApplicantForm from "@/components/applicant/ApplicantForm";

export default function ApplyNow() {
    return (
        <section className="w-1/2 bg-orange-400 rounded-xl gap-10 text-white mx-auto p-5 m-10">
            <h1 className="text-2xl font-bold">INPUT INFORMATION</h1>
            <ApplicantForm />
        </section>
    );
}
