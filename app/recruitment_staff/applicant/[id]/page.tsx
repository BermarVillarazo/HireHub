import { Title } from "@/components/Title";
import ApplicantListDisplayRecruitmentStaffPOV from "@/components/recruitment_staff/ApplicantListDisplayRecruitmentStaffPOV";
import { baseUrl } from "@/constants";
import { ApplicantSelect, RatingSelect, StatusEnums } from "@/lib/schema";

export default async function ApplicantId({ params }: { params: { id: string } }) {
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

    let status: RatingSelect[] = [];
    try {
        const response = await fetch(`${baseUrl}/api/applicant/status`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-cache",
        });
        const data = await response.json();
        status = data.status;
    } catch (error) {
        console.log(`Fetch API error: ${baseUrl}/api/applicant/status`);
    }

    return (
        <section className="w-11/12 mx-auto">
            <section className="flex-1 p-5">
                <Title title="CANDIDATES INFORMATION" />
                <section className="w-full bg-amber-500 rounded-lg my-5 p-12 text-white flex flex-col gap-y-8">
                    <ApplicantListDisplayRecruitmentStaffPOV
                        applicant={applicant}
                        id={params.id}
                        status={status}
                    />
                </section>
            </section>
        </section>
    );
}
