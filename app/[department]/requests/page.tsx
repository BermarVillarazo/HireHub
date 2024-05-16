import RequestsPage from "@/components/department/RequestsPage";

export default async function Requests({ params }: { params: { department: string } }) {
    return (
        <section className="w-11/12 h-screen mx-auto flex flex-row">
            <RequestsPage department={params.department} />
        </section>
    );
}
