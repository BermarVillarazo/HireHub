"use client";

import { DepartmentSelect, User } from "@/lib/schema";
import { ChildrenProps } from "@/types/type";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import toast from "react-hot-toast";
import ConfirmationPopup from "../Modal";
import Empty from "../Empty";

type DepartmentRepresentative = {
    departmentName: string;
};

type RecruitmentStaffUsersDepartmentPageProps = {
    departmentUsers: User[];
    departmentUpdate: DepartmentSelect[];
};

export default function RecruitmentStaffUsersDepartmentPage({
    departmentUsers,
    departmentUpdate,
}: RecruitmentStaffUsersDepartmentPageProps) {
    const [showConfirmationMessage, setShowConfirmationMessage] = useState<boolean>(false);
    const [formData, setFormData] = useState<DepartmentRepresentative>();
    const [selectedRepresentativeId, setSelectedRepresentativeId] = useState<string | null>(null);
    const router = useRouter();

    function handleSelectUserRole(id: string) {
        setSelectedRepresentativeId(id);
    }

    function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const departmentName = e.currentTarget.departmentName.value;
        setFormData({ departmentName });
        setShowConfirmationMessage(true);
    }

    async function handleConfirmUpdateUserRole() {
        console.log(formData);
        console.log(formData?.departmentName);
        if (formData?.departmentName === "") {
            return toast.error("Please select a department or an office");
        } else if (formData?.departmentName && formData?.departmentName !== "") {
            try {
                const response = await fetch(
                    `/api/recruitment_staff/staff/department/${selectedRepresentativeId}`,
                    {
                        method: "PUT",
                        body: JSON.stringify(formData),
                    }
                );
                const data = await response.json();
                if (data.status === 404) {
                    return toast.error(data.error);
                } else if (data.status === 409) {
                    return toast.error(data.error);
                }

                console.log(formData.departmentName);
                console.log(formData);

                router.refresh();
                setShowConfirmationMessage(false);
                return toast.success("Department selected");
            } catch (error) {
                console.log(error);
                return toast.error("Internal Server Error. Something went wrong!");
            }
        }
    }

    return (
        <>
            {departmentUsers.length > 0 ? (
                departmentUsers.map(({ id, name, firstName, lastName, email, departmentName }) => (
                    <form
                        key={id}
                        onSubmit={handleFormSubmit}
                        //   className="flex justify-around gap-3 items-center"
                        className="grid grid-cols-7 justify-center text-center p-4 gap-2"
                    >
                        <Div>{name}</Div>
                        <Div>{firstName}</Div>
                        <Div>{lastName}</Div>
                        <Div>{email}</Div>
                        <Div>{departmentName}</Div>
                        <select name="departmentName" className="w-full h-full">
                            <DefualtOption>Update Representative...</DefualtOption>
                            {departmentUpdate.map(({ department_id, department_name }) => (
                                <Fragment key={department_id}>
                                    <option value={department_name}>{department_name}</option>
                                </Fragment>
                            ))}
                        </select>
                        <button
                            onClick={() => handleSelectUserRole(id)}
                            className="w-32 relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-lg border-red-900 bg-gradient-to-tr from-red-700 to-red-800 p-2 font-bold text-sm text-white shadow-lg transition duration-100 ease-in-out active:translate-y-0.5 hover:scale-95 active:shadow-none"
                        >
                            Update Role
                        </button>
                        {showConfirmationMessage && (
                            <ConfirmationPopup
                                message="Are you sure you want to update the role of user"
                                onCancel={() => setShowConfirmationMessage(false)}
                                onConfirm={handleConfirmUpdateUserRole}
                            />
                        )}
                    </form>
                ))
            ) : (
                <Empty title="No Users Found." />
            )}
        </>
    );
}

function Div({ children }: ChildrenProps) {
    return <div className="flex items-center justify-center text-base leading-4">{children}</div>;
}

function DefualtOption({ children }: ChildrenProps) {
    return <option value="">{children}</option>;
}
