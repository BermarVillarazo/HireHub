import { getAllApplicants } from "@/GET/GET";

export default async function Applicant() {
    const applicants = await getAllApplicants();

    const applicantHeaders = ["Name", "Email", "Contact", "Resume", "Position"];

    return (
        <div className="w-full min-h-screen p-10">
            <h1 className="mb-8 text-3xl font-bold">Applicants</h1>
            <div className="w-full overflow-x-auto">
                <table
                    className="w-full text-left border border-separate rounded border-slate-200"
                    cellSpacing="0"
                >
                    <tbody>
                        <tr>
                            {applicantHeaders.map((header) => (
                                <th
                                    key={header}
                                    scope="col"
                                    className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                        {applicants.map(
                            ({ first_Name, last_Name, email, contactNumber, resume, position }) => (
                                <tr
                                    key={email}
                                    className="transition-colors duration-300 hover:bg-slate-50"
                                >
                                    <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                                        {first_Name} {last_Name}
                                    </td>
                                    <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                                        {email}
                                    </td>
                                    <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                                        {contactNumber}
                                    </td>
                                    <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                                        {resume}
                                    </td>
                                    <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                                        {position}
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
