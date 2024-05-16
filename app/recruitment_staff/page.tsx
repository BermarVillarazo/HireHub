import { HighlightProps } from "@/app/types/type";
import ApplicantsChart from "@/components/recruitment_staff/charts/ApplicantsChart";

export default async function Dashboard() {
    // bar chart
    const data = {
        labels: ["January", "February", "March", "April", "May", "June", "July"], // y-axis
        datasets: [
            {
                label: "My First Dataset",
                data: [65, 59, 80, 81, 56, 55, 40], // x-axis
                backgroundColor: "black",
                borderColor: "black",
                borderWidth: 1,
            },
        ],
        backgroundColor: "black",
        borderColor: "black",
        borderWidth: 1,
    };

    return (
        <section className="py-14">
            <section className="w-10/12 mx-auto flex flex-row gap-x-8">
                <Highlight title="Total Employees" value={343} />
                <Highlight title="Total Applicants" value={343} />
                <Highlight title="Job View" value={343} />
                <Highlight title="Job Requests" value={343} />
            </section>
            <section>
                <div className="w-10/12 h-[70vh] mx-auto rounded-lg my-8 bg-amber-500 flex">
                    <div className="w-full h-full p-5 flex justify-center">
                        <ApplicantsChart data={data} />
                    </div>
                </div>
            </section>
        </section>
    );
}

function Highlight({ title, value }: HighlightProps) {
    return (
        <div className="w-1/4 p-5 rounded-lg bg-amber-500">
            <h1 className="text-lg font-bold">{title}</h1>
            <p className="text-5xl font-bold">{value}</p>
        </div>
    );
}
