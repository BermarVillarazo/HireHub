import { getAllDeptartmentOrOfficeRequests } from "@/GET/GET";
import Link from "next/link";
import { Title } from "../Title";

export default async function SidebarRequest({
  department,
}: {
  department: string;
}) {
  const { departmentJobRequests, officeJobRequests } =
    await getAllDeptartmentOrOfficeRequests(department);

  console.log(departmentJobRequests, officeJobRequests);
  return (
    <section className="flex flex-col gap-5 w-2/3 h-[100vh] py-5 px-4 sticky top-0 overflow-y-scroll overflow-x-hidden text-base-content">
      <Title title="Request Lists" />
      {departmentJobRequests.map(
        (
          {
            request_id,
            requested_position,
            request_type,
            request_qualification,
            officeName,
          },
          index
        ) => (
          <DisplayApplicant
            key={request_id}
            id={request_id}
            index={index}
            department={department}
            requested_position={requested_position}
            request_type={request_type}
            request_qualification={request_qualification}
            officeName={officeName ?? ""}
          />
        )
      )}
      {officeJobRequests.map(
        (
          {
            request_id,
            requested_position,
            request_type,
            request_qualification,
            officeName,
          },
          index
        ) => (
          <DisplayApplicant
            key={request_id}
            id={request_id}
            index={index}
            department={department}
            requested_position={requested_position}
            request_type={request_type}
            request_qualification={request_qualification}
            officeName={officeName ?? ""}
          />
        )
      )}
    </section>
  );
}

type DisplayApplicantProps = {
  id: number;
  department: string;
  requested_position: string;
  request_type: string;
  request_qualification: string;
  officeName: string;
  index: number;
};

function DisplayApplicant({
  id,
  department,
  requested_position,
  request_type,
  request_qualification,
  officeName,
  index,
}: DisplayApplicantProps) {
  return (
    <div className="w-full border-l-4 border-red-500 bg-gradient-to-r from-[#FAA916] to-[#FDDFA8] px-8 py-6 rounded-xl shadow-md hover:scale-95 duration-500 flex flex-col gap-5">
      <div className="flex gap-4">
        <span className="font-bold text-4xl w-[18%] min-w-[70px] flex items-center justify-center bg-white text-custom-yellow rounded-full">
          {index < 10 ? "0" + (index + 1).toString() : index}
        </span>
        <div className="flex flex-col">
          <span className="text-2xl font-bold">
            Position: {requested_position}
          </span>
          <span className="text-medium text-slate-700">
            Type: {request_type}
          </span>
          <span className="text-medium text-slate-700">
            Office: {department || officeName}
          </span>
        </div>
      </div>
      <div className="relative group self-end">
        <Link
          href={`/${department || officeName}/requests/${id}`}
          scroll={false}
        >
          View details
        </Link>
        <div className="absolute left-0 bottom-0 w-0 h-[1px] bg-slate-700 rounded-xl group-hover:w-24 transition-all duration-300"></div>
      </div>
    </div>
  );
}
