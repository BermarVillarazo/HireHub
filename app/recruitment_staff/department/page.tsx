import DepartmentForm from "@/components/recruitment_staff/DepartmentForm";
import DepartmentLists from "@/components/recruitment_staff/DepartmentLists";
import { baseUrl } from "@/constants";
import { DepartmentSelect } from "@/lib/schema";
import { ReactNode, Suspense } from "react";

export default async function DepartmentPage() {
    let departments: DepartmentSelect[] = [];
    try {
        const response = await fetch(`${baseUrl}/api/recruitment_staff/department`);
        const data = await response.json();
        departments = data.departments;
    } catch (error) {
        console.log(error);
    }

    return (
        <section className="py-10">
            <section className="w-10/12 mx-auto rounded-lg bg-amber-500">
                <div className="p-10">
                    <Title>Add Department</Title>
                    <Suspense fallback={<>LOADING....</>}>
                        <DepartmentForm />
                    </Suspense>
                </div>
            </section>
            <section className="w-10/12 mx-auto mt-10 rounded-lg bg-amber-500">
                <div className="p-10">
                    <Title>Lists of Departments</Title>
                    <div className="flex flex-col gap-5 mt-5">
                        <div className="flex gap-3">
                            <div className="flex justify-between items-center w-52 p-3 bg-white rounded-lg shadow-xl">
                                <span className="mx-auto text-lg font-bold">CODE</span>
                            </div>
                            <div className="flex justify-between items-center w-full p-3 bg-white rounded-lg shadow-xl">
                                <span className="mx-auto text-lg font-bold">Department Name</span>
                            </div>
                            <div className="flex justify-between items-center w-32 p-3 bg-white rounded-lg shadow-xl">
                                <span className="mx-auto text-lg font-bold">Action</span>
                            </div>
                        </div>
                        <Suspense
                            fallback={
                                <div className="animate-pulse w-full h-12 mx-auto my-5 rounded-xl bg-white"></div>
                            }
                        >
                            <DepartmentLists departments={departments} />
                        </Suspense>
                    </div>
                </div>
            </section>
        </section>
    );
}

function Title({ children }: { children: ReactNode }) {
    return <h1 className="text-3xl font-bold text-white">{children}</h1>;
}
