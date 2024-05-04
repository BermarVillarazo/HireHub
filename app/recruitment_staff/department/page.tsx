import { getAllDepartments } from "@/app/GET/GET";
import { TitleProps } from "@/app/types/type";
import DepartmentForm from "@/components/recruitment_staff/Department";
import DepartmentLists from "@/components/recruitment_staff/DepartmentLists";

export default async function Department() {
    const { departments } = await getAllDepartments();

    return (
        <section>
            <section className="w-10/12 mx-auto mt-10 rounded-lg bg-amber-500">
                <div className="p-10">
                    <Title title="Department" />
                    <DepartmentForm />
                </div>
            </section>
            <section className="w-10/12 mx-auto mt-10 rounded-lg bg-amber-500">
                <div className="p-10">
                    <Title title="Lists of Departments" />
                    <DepartmentLists departments={departments} />
                </div>
            </section>
        </section>
    );
}

export function Title({ title }: TitleProps) {
    return <h1 className="text-3xl font-bold text-white">{title}</h1>;
}
