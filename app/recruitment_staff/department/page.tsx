import { getAllDepartments } from "@/app/GET/GET";
import DepartmentForm from "@/components/recruitment_staff/DepartmentForm";
import DepartmentLists from "@/components/recruitment_staff/DepartmentLists";
import { ReactNode } from "react";

export default async function DepartmentPage() {
    const departments = await getAllDepartments();

    return (
        <section className="py-10">
            <section className="w-10/12 mx-auto rounded-lg bg-amber-500">
                <div className="p-10">
                    <Title>Add Department</Title>
                    <DepartmentForm />
                </div>
            </section>
            <section className="w-10/12 mx-auto mt-10 rounded-lg bg-amber-500">
                <div className="p-10">
                    <Title>Lists of Departments</Title>
                    <DepartmentLists departments={departments} />
                </div>
            </section>
        </section>
    );
}

function Title({ children }: { children: ReactNode }) {
    return <h1 className="text-3xl font-bold text-white">{children}</h1>;
}

