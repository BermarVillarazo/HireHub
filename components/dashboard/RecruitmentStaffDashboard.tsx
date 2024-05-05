"use client";

import { ChildrenProps, DepartmentListsProps, OfficeListsProps } from "@/app/types/type";
import { User } from "@/lib/schema";
import { useRouter } from "next/navigation";
import { ChangeEvent, Fragment, useState } from "react";
import toast from "react-hot-toast";
import ConfirmationPopup from "../Modal";

// enum UserRole {
//     HR_HEAD = "hr_head",
//     SUPER_ADMIN = "super_admin",
//     VP_ACAD = "vp_acad",
//     VP_ADMIN = "vp_admin",
//     RECRUITER = "recruiter",
// }

export default function RecruitmentStaffDashboard({
    users,
    departments,
    offices,
}: {
    users: User;
    departments: DepartmentListsProps;
    offices: OfficeListsProps;
}) {
    const [showConfirmationMessage, setShowConfirmationMessage] = useState(false);
    const [formData, setFormData] = useState({ department: "", office: "" });
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const router = useRouter();

    function handleSelectUserRole(userId: number) {
        setSelectedUserId(userId);
        setShowConfirmationMessage(true);
    }

    function handleDepartmentChange(e: ChangeEvent<HTMLSelectElement>) {
        setFormData({ ...formData, department: e.target.value });
    }

    function handleOfficeChange(e: ChangeEvent<HTMLSelectElement>) {
        setFormData({ ...formData, office: e.target.value });
    }

    // PLEASE DO NOTE,
    // THIS FUNCTION HAS A BUG WHERE THE NAME OF THE USER WILL BE OUTPUTTED AS UNDEFINED.
    // THIS FUNCTION WILL WORK ONLY IF YOU SET THE USER'S ROLE TO THE FIRST ROW OF THE TABLE,
    // AND IT WON'T WORK IF YOU SET THE USER'S ROLE TO THE SECOND ROW OR BEYOND.
    async function handleConfirmUpdateUserRole() {
        try {
            if (!selectedUserId) return;

            console.log("selectedUserId", selectedUserId);
            console.log("formData", formData);

            // await fetch(`http://localhost:3000/api/recruitment_staff/${selectedUserId}`, {
            //     method: "PUT",
            //     cache: "no-cache",
            //     body: JSON.stringify({ formData }),
            // });

            // router.refresh();

            // return toast.success(`User has updated the role into ${formData}!`);
        } catch (error: unknown) {
            return toast.error("Something went wrong!" + (error as Error).message);
        }
    }

    return (
        <div className="w-full">
            <div className="w-full overflow-x-auto">
                {/* {Array.isArray(users) &&
                    users.map(({ id, name, firstName, lastName, email, role }: User) => (
                        <div key={id} className="flex gap-3 py-2">
                            <Div>
                                <Title>Name</Title>
                                <Description>{name}</Description>
                            </Div>
                            <Div>
                                <Title>First Name</Title>
                                <Description>{firstName}</Description>
                            </Div>
                            <Div>
                                <Title>Last Name</Title>
                                <Description>{lastName}</Description>
                            </Div>
                            <Div>
                                <Title>Email</Title>
                                <Description>{email}</Description>
                            </Div>
                            <Div>
                                <h1 className="bg-amber-500 text-xl font-bold p-1.5">Role</h1>
                                <select name="role" className="w-full bg-orange-300 p-1.5">
                                    <option value="">{role}</option>
                                    <option value="hr_head">hr_head</option>
                                    <option value="recruiter">recruiter</option>
                                </select>
                            </Div>
                            <Div>
                                <Title>Verify</Title>
                                <input type="checkbox" name="verify" defaultValue={`${id}`} />
                            </Div>
                            <Div>
                                <button type="submit">Submit</button>
                            </Div>
                        </div>
                    ))} */}
                {Array.isArray(users) &&
                    users.map(
                        ({
                            id,
                            name,
                            firstName,
                            lastName,
                            email,
                            role,
                            department_name,
                            office_name,
                        }) => (
                            <form key={id} className="flex justify-between gap-3 items-center">
                                <div className="flex justify-between items-center w-52 p-3 bg-white rounded-lg shadow-xl">
                                    <span className="mx-auto">{name}</span>
                                </div>
                                <div className="flex justify-between items-center w-full p-3 bg-white rounded-lg shadow-xl">
                                    <span className="mx-auto">{firstName}</span>
                                </div>
                                <div className="flex items-center gap-10 w-full p-3 bg-white rounded-lg shadow-xl">
                                    <div className="flex flex-col flex-1">
                                        <label htmlFor="">Department</label>
                                        <select
                                            name="role"
                                            onChange={handleDepartmentChange}
                                            className="w-full p-1.5"
                                        >
                                            <option value="">{role}</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col flex-1">
                                        <label htmlFor="">Department</label>
                                        <select
                                            name="role"
                                            onChange={handleDepartmentChange}
                                            className="w-full p-1.5"
                                        >
                                            <option value="">Choose a Department</option>
                                            {Array.isArray(departments) &&
                                                departments.map(
                                                    ({ department_id, department_code }) => (
                                                        <Fragment key={department_id}>
                                                            <option value={department_code}>
                                                                {department_code.toUpperCase()}
                                                            </option>
                                                        </Fragment>
                                                    )
                                                )}
                                        </select>
                                    </div>
                                    <div className="flex flex-col flex-1">
                                        <label htmlFor="">Office</label>
                                        <select
                                            name="role"
                                            onChange={handleOfficeChange}
                                            className="w-full p-1.5"
                                        >
                                            <option value="">{role}</option>
                                            {Array.isArray(offices) &&
                                                offices.map(({ office_id, office_code }) => (
                                                    <Fragment key={office_id}>
                                                        <option value={office_code}>
                                                            {office_code.toUpperCase()}
                                                        </option>
                                                    </Fragment>
                                                ))}
                                        </select>
                                    </div>
                                </div>
                                {/* <button className="w-32 bg-white rounded-lg shadow-xl">Edit</button> */}
                                <button
                                    formAction={(e) => handleSelectUserRole(id)}
                                    className="group w-32 relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-lg border-red-900 bg-gradient-to-tr from-red-700 to-red-800 p-3 font-bold text-white shadow-lg transition duration-100 ease-in-out active:translate-y-0.5 hover:scale-95 active:shadow-none"
                                >
                                    Update Role
                                </button>
                                {showConfirmationMessage && (
                                    <ConfirmationPopup
                                        message={`Are you sure you want to update the role of user "${name}" to ${
                                            formData.department
                                                ? formData.department
                                                : formData.office
                                        }`}
                                        onCancel={() => setShowConfirmationMessage(false)}
                                        onConfirm={handleConfirmUpdateUserRole}
                                    />
                                )}
                            </form>
                        )
                    )}
            </div>
        </div>
    );
}

function Div({ children }: ChildrenProps) {
    return <div className="text-md font-semibold bg-white w-full p-1.5">{children}</div>;
}

function Title({ children }: ChildrenProps) {
    return <h1 className="bg-amber-500 text-xl font-bold p-1.5">{children}</h1>;
}

function Description({ children }: ChildrenProps) {
    return <h1 className="bg-orange-300 p-1.5">{children}</h1>;
}
