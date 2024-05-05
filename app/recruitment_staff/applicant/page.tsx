import { getAllApplicants, getAllDepartments } from "@/app/GET/GET";

export default async function Applicant() {
  const { applicants } = await getAllApplicants();
  const { departments } = await getAllDepartments();

  const applicantHeaders = ["Name", "Email", "Contact", "Resume", "Position"];

  console.log(applicants);
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
                  scope="col"
                  className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
                >
                  {header}
                </th>
              ))}
            </tr>
            {applicants.map((applicant: any) => (
              <tr className="transition-colors duration-300 hover:bg-slate-50">
                <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                  {applicant.first_Name} {applicant.last_Name}
                </td>
                <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                  {applicant.email}
                </td>
                <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                  {applicant.contactNumber}
                </td>
                <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                  {applicant.resume}
                </td>
                <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                  {applicant.position}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
