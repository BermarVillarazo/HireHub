"use client";

import { ChildrenProps } from "@/app/types/type";
import { User } from "@/lib/schema";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import toast from "react-hot-toast";

enum UserRole {
    HR_HEAD = "hr_head",
    SUPER_ADMIN = "super_admin",
    VP_ACAD = "vp_acad",
    VP_ADMIN = "vp_admin",
    RECRUITER = "recruiter",
}

export default function AdminForm({ users }: { users: User }) {
    const router = useRouter();

    // PLEASE DO NOTE,
    // THIS FUNCTION HAS A BUG WHERE THE NAME OF THE USER WILL BE OUTPUTTED AS UNDEFINED.
    // THIS FUNCTION WILL WORK ONLY IF YOU SET THE USER'S ROLE TO THE FIRST ROW OF THE TABLE,
    // AND IT WON'T WORK IF YOU SET THE USER'S ROLE TO THE SECOND ROW OR BEYOND.
    async function updateUser(e: FormEvent<HTMLFormElement>) {
        try {
            e.preventDefault();

            const form = e.currentTarget;
            const formData = new FormData(form);
            const userId = formData.get("verify");
            const role: UserRole = formData.get("role") as UserRole;

            if (!userId) {
                return toast.error("Please don't forget to verify the user");
            } else if (role && Object.values(UserRole).includes(role)) {
                console.log("role:", role, "userId:", userId);
            } else {
                console.error("Invalid role:", role);
                return toast.error("Please update the role");
            }

            await fetch(`http://localhost:3000/api/recruitment_staff/${userId}`, {
                method: "PUT",
                cache: "no-cache",
                body: JSON.stringify({ role }),
            });

            router.refresh();

            // PLEASE NOT THAT users.name WILL BE OUTPUTTED AS UNDEFINED
            return toast.success(`User has updated the role into ${role}!`);
        } catch (error: unknown) {
            return toast.error("Something went wrong!" + (error as Error).message);
        }
    }

    return (
        <form onSubmit={updateUser} className="w-full">
            <div className="w-full overflow-x-auto">
                {Array.isArray(users) &&
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
                    ))}
            </div>
        </form>
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
