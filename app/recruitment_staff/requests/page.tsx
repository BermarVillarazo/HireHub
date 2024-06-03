import RequestsPage from "@/components/recruitment_staff/RequestsPage";

export default async function Requests({ params }: { params: { department: string } }) {
    const department = decodeURIComponent(params.department);

    return (
        <section className="w-11/12 h-screen mx-auto flex flex-row">
            <RequestsPage department={department} />
        </section>
    );
}
