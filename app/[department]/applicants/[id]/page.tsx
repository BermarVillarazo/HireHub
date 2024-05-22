import ApplicantListDisplay from "@/components/department/ApplicantListDisplay";
import { baseUrl } from "@/constants";
import { ApplicantSelect } from "@/lib/schema";

export default async function ApplicantId({ params }: { params: { id: number } }) {
    let applicant: ApplicantSelect[] = [];
    try {
        const response = await fetch(`${baseUrl}/api/applicant/${params.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-cache",
        });
        const data = await response.json();
        applicant = data.applicant;
    } catch (error) {
        console.log(`Fetch API error: ${baseUrl}/api/applicant/${params.id}`);
    }

    return (
        <section className="w-11/12 mx-auto">
            <ApplicantListDisplay applicant={applicant} />
        </section>
    );
}
