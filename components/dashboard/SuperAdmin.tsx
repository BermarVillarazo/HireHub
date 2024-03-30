import { Props } from "@/app/types/type";
import { getUsers } from "@/lib/db";
import React from "react";
import { TableHead, TableRow } from "./ReusableTable";

export default async function SuperAdmin({ user }: Props) {
    const getAllUsers = await getUsers();

    return (
        <>
            <div className="w-full overflow-x-auto">
                <table className="w-full text-left border border-separate rounded" cellSpacing="2">
                    <tbody>
                        <tr>
                            <TableHead>Name</TableHead>
                            <TableHead>First Name</TableHead>
                            <TableHead>Last Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Submit</TableHead>
                            <TableHead>Decline</TableHead>
                        </tr>
                        {getAllUsers.map(({ id, name, firstName, lastName, email, role }) => (
                            <React.Fragment key={id}>
                                <TableRow
                                    name={name ?? ""}
                                    firstName={firstName ?? ""}
                                    lastName={lastName ?? ""}
                                    email={email ?? ""}
                                    role={role ?? ""}
                                />
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
