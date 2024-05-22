"use client";

import { DepartmentSelect, OfficeSelect, User } from "@/lib/schema";
import { ChildrenProps } from "@/types/type";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import toast from "react-hot-toast";
import Empty from "../Empty";
import ConfirmationPopup from "../Modal";

type DepartmentOfficeRepresentative = {
    departmentName: string;
    officeName: string;
};

type RecruitmentStaffUsersPageProps = {
    users: User[];
    departments: DepartmentSelect[];
    offices: OfficeSelect[];
};

export default function RecruitmentStaffUsersPage({
    users,
    departments,
    offices,
}: RecruitmentStaffUsersPageProps) {
    const [showConfirmationMessage, setShowConfirmationMessage] = useState<boolean>(false);
    const [formData, setFormData] = useState<DepartmentOfficeRepresentative>();
    const [selectedRepresentativeId, setSelectedRepresentativeId] = useState<string | null>(null);
    const router = useRouter();

    function handleSelectUserRole(id: string) {
        setSelectedRepresentativeId(id);
    }

    function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const object = Object.fromEntries(formData.entries());
        setFormData(object as DepartmentOfficeRepresentative);
        setShowConfirmationMessage(true);
    }

    async function handleConfirmUpdateUserRole() {
        if (formData?.departmentName === "" && formData?.officeName === "") {
            return toast.error("Please select a department or an office");
        } else if (formData?.departmentName !== "" && formData?.officeName !== "") {
            return toast.error("Please select either a department or an office, not both");
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

                router.refresh();
                setShowConfirmationMessage(false);
                return toast.success("Department selected");
            } catch (error) {
                console.log(error);
                return toast.error("Internal Server Error. Something went wrong!");
            }
        } else if (formData?.officeName && formData?.officeName !== "") {
            try {
                const response = await fetch(
                    `/api/recruitment_staff/staff/office/${selectedRepresentativeId}`,
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

                router.refresh();
                setShowConfirmationMessage(false);
                return toast.success("Office selected");
            } catch (error) {
                console.log(error);
                return toast.error("Internal Server Error. Something went wrong!");
            }
        }
    }

    return (
        <>
            {users.length > 0 ? (
                users.map(({ id, name, firstName, lastName, email, role }) => (
                    <form
                        key={id}
                        onSubmit={handleFormSubmit}
                        //   className="flex justify-around gap-3 items-center"
                        className="grid grid-cols-8 justify-center items-centers text-center p-4 gap-2"
                    >
                        <Div>{name}</Div>
                        <Div>{firstName}</Div>
                        <Div>{lastName}</Div>
                        <Div>{email}</Div>
                        <Div>{role}</Div>
                        <select name="departmentName" className="w-full h-full text-sm">
                            <DefualtOption>Choose a Dept...</DefualtOption>
                            {departments.map(({ department_id, department_name }) => (
                                <Fragment key={department_id}>
                                    <option value={department_name}>{department_name}</option>
                                </Fragment>
                            ))}
                        </select>
                        <select name="officeName" className="w-full h-full text-sm">
                            <DefualtOption>Choose an Office...</DefualtOption>
                            {offices.map(({ office_id, office_name }) => (
                                <Fragment key={office_id}>
                                    <option value={office_name}>{office_name}</option>
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
    return <div className="flex items-center justify-center text-sm leading-4">{children}</div>;
}

function DefualtOption({ children }: ChildrenProps) {
    return <option value="">{children}</option>;
}
