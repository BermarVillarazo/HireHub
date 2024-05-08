import { getAllApplicants } from "@/app/GET/GET";
import RequestsPage from "@/components/department/Requests";
import { ApplicantSelect } from "@/lib/schema";

export default async function Requests({ params }: { params: { department: string } }) {
    const applicants: ApplicantSelect[] = await getAllApplicants();

    return (
        <section className="w-full h-[100vh] mx-auto py-5 px-36 flex flex-row">
            <RequestsPage applicants={applicants} params={params.department} />
        </section>
    );
}
