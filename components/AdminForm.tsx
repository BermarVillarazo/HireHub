"use client";

import { ChildrenProps } from "@/app/types/type";
import { User } from "@/lib/schema";
import { FormEvent } from "react";

enum UserRole {
    HR_HEAD = "hr_head",
    SUPER_ADMIN = "super_admin",
    VP_ACAD = "vp_acad",
    VP_ADMIN = "vp_admin",
    RECRUITER = "recruiter",
}

export default function AdminForm({ data }: { data: User }) {
    async function updateUser(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);
        const name = formData.get("verify");
        const role: UserRole = formData.get("role") as UserRole;

        if (role && Object.values(UserRole).includes(role)) {
            console.log("role:", role, "name:", name);
            // console.log("role:", role, "is valid:", Object.values(UserRole).includes(role));
        } else {
            console.error("Invalid role:", role);
            // console.log("role:", role, "is valid:", Object.values(UserRole).includes(role));
        }

        const response: Response = await fetch(`http://localhost:3000/api/applicant/${data.id}`);
        const userData = await response.json();
        console.log(userData);
    }

    return (
        <form onSubmit={updateUser} className="w-full">
            <div className="w-full overflow-x-auto">
                {Array.isArray(data) &&
                    data.map(({ id, name, firstName, lastName, email, role }: User) => (
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
                                    <option value="vp_acad">vp_acad</option>
                                    <option value="vp_admin">vp_admin</option>
                                    <option value="recruiter">recruiter</option>
                                </select>
                            </Div>
                            <Div>
                                <Title>Verify</Title>
                                <input type="checkbox" name="verify" defaultValue={`${name}`} />
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
