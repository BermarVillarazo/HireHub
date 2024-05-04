"use client";

import toast from "react-hot-toast";

type DepartmentListsProps = {
    departments: {
        department_id: number;
        department_name: string;
        department_code: string;
    };
};

export default function DepartmentLists({ departments }: DepartmentListsProps) {
    async function handleDeleteDepartment(departmentId: number) {
        const response = await fetch(`/api/recruitment_staff/department/${departmentId}`, {
            method: "DELETE",
            body: JSON.stringify({ departmentId }),
        });
        const data = await response.json();

        if (response.status === 404) {
            const error = await response.json();
            return toast.error(error);
        } else {
            
            return toast.success(data.message);
        }
    }

    return (
        <section>
            <div className="flex flex-col gap-5 mt-5">
                {Array.isArray(departments) &&
                    departments.map(({ department_id, department_name, department_code }) => (
                        <form
                            key={department_id}
                            className="flex justify-between gap-5 items-center"
                        >
                            <div className="flex justify-between items-center w-full  p-3 bg-white rounded-lg shadow-sm">
                                <span>{department_code}</span>
                                <span>{department_name}</span>
                            </div>
                            <button>Edit</button>
                            <button formAction={(e) => handleDeleteDepartment(department_id)}>
                                Delete
                            </button>
                        </form>
                    ))}
            </div>
        </section>
    );
}
