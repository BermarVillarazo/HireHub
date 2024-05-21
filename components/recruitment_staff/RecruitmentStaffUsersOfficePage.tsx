"use client";

import { OfficeSelect, User } from "@/lib/schema";
import { ChildrenProps } from "@/types/type";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import toast from "react-hot-toast";
import ConfirmationPopup from "../Modal";
import Empty from "../Empty";

type OfficeRepresentative = {
    officeName: string;
};

type RecruitmentStaffUsersOfficePageProps = {
    officeUsers: User[];
    officeUpdate: OfficeSelect[];
};

export default function RecruitmentStaffUsersOfficePage({
    officeUsers,
    officeUpdate,
}: RecruitmentStaffUsersOfficePageProps) {
    const [showConfirmationMessage, setShowConfirmationMessage] = useState<boolean>(false);
    const [formData, setFormData] = useState<OfficeRepresentative>();
    const [selectedRepresentativeId, setSelectedRepresentativeId] = useState<string | null>(null);
    const router = useRouter();

    function handleSelectUserRole(id: string) {
        setSelectedRepresentativeId(id);
    }

    function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const officeName = e.currentTarget.officeName.value;
        setFormData({ officeName });
        setShowConfirmationMessage(true);
    }

    async function handleConfirmUpdateUserRole() {
        console.log(formData);
        console.log(formData?.officeName);
        if (formData?.officeName === "") {
            return toast.error("Please select a office or an office");
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
            {officeUpdate.length > 0 ? (
                officeUsers.map(({ id, name, firstName, lastName, email, officeName }) => (
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
                        <Div>{officeName}</Div>
                        <select name="officeName" className="w-full h-full">
                            <DefualtOption>Update Representative...</DefualtOption>
                            {officeUpdate.map(({ office_id, office_name }) => (
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
    return <div className="flex items-center justify-center text-base leading-4">{children}</div>;
}

function DefualtOption({ children }: ChildrenProps) {
    return <option value="">{children}</option>;
}
