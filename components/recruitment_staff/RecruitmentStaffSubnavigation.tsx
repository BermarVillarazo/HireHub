"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

const RecruitmentSubNavigation = [
    {
        path: "/recruitment_staff/users",
        name: "Users",
    },
    {
        path: "/recruitment_staff/users/departments",
        name: "Departments",
    },
    {
        path: "/recruitment_staff/users/offices",
        name: "Offices",
    },
];

export default function RecruitmentStaffSubnavigation() {
    const pathname = usePathname();

    return (
        <nav className="flex justify-center items-center gap-5 py-10">
            {RecruitmentSubNavigation.map(({ path, name }, index) => (
                <Fragment key={path}>
                    <Link href={path} className={`${pathname === path ? "font-bold" : ""}`}>
                        {name}
                    </Link>
                    {index < RecruitmentSubNavigation.length - 1 && " | "}
                </Fragment>
            ))}
        </nav>
    );
}
