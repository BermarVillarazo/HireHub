import { getAllOfficesById } from "@/GET/GET";
import RequestsDisplay from "@/components/recruitment_staff/AllRequestsDisplay";

export default async function ApplicantId({ params }: { params: { id: string } }) {
    const jobRequests = await getAllOfficesById(params.id);

    return (
        <section className="w-11/12 mx-auto">
            <RequestsDisplay jobRequests={jobRequests} />
        </section>
    );
}
