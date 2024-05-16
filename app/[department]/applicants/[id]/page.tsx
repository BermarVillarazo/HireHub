import { getApplicantById } from "@/app/GET/GET";
import ApplicantListDisplay from "@/components/department/ApplicantListDisplay";

export default async function ApplicantId({ params }: { params: { id: string } }) {
    const applicant = await getApplicantById(params.id);

    return (
        <section className="w-11/12 mx-auto">
            <ApplicantListDisplay applicant={applicant} />
        </section>
    );
}
