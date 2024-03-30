import { UsersProps } from "@/app/types/type";
import { ReactNode } from "react";

export default function TableSimple() {
    return <>hehe</>;
}

type ChildrenProps = {
    children: ReactNode;
};

export function TableHead({ children }: ChildrenProps) {
    return (
        <th
            scope="col"
            className="h-12 px-6 text-md text-center font-bold border-l first:border-l-0 bg-amber-500"
        >
            {children}
        </th>
    );
}

export function TableRow({ name, firstName, lastName, email, role }: UsersProps) {
    return (
        <tr className="bg-orange-300 transition-colors duration-300 hover:bg-amber-500">
            <TableDescription>{name}</TableDescription>
            <TableDescription>{firstName}</TableDescription>
            <TableDescription>{lastName}</TableDescription>
            <TableDescription>{email}</TableDescription>
            <td className="h-12 px-6 text-sm text-center font-medium transition duration-300 border-t border-l first:border-l-0 border-slate-200">
                <select name="" className="text-center bg-orange-300 hover:bg-amber-500">
                    <option value="" className="bg-orange-300 hover:bg-amber-500">
                        {role}
                    </option>
                    <option value="" className="bg-orange-300 hover:bg-amber-500">
                        hr_admin
                    </option>
                    <option value="" className="bg-orange-300 hover:bg-amber-500">
                        vp_acad
                    </option>
                    <option value="" className="bg-orange-300 hover:bg-amber-500">
                        vp_admin
                    </option>
                </select>
            </td>
            <TableDescription>
                <input type="checkbox" />
            </TableDescription>
            <TableDescription>
                <input type="checkbox" />
            </TableDescription>
        </tr>
    );
}

export function TableDescription({ children }: ChildrenProps) {
    return (
        <td className="h-12 px-6 text-sm text-center font-medium transition duration-300 border-t border-l first:border-l-0 border-slate-200">
            {children}
        </td>
    );
}
