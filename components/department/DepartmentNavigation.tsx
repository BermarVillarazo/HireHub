"use client";

import Link from "next/link";
import { useState } from "react";

export default function DepartmentNavigation({ department }: { department: string }) {
    const [nav, setNav] = useState(false);
    function handleNav() {
        setNav(!nav);
    }
    return (
        <>
            <div onClick={handleNav} className="block px-3 md:hidden">
                {nav ? "Close" : "Open"}
            </div>
            <ul
                className={
                    nav
                        ? "fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-red-900 ease-in-out duration-500"
                        : "ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]"
                }
            >
                <h1 className="w-full text-3xl font-bold m-4">HireHub</h1>
                <Link href={`/${department}/requests`}>Requests</Link>
                <Link href={`/${department}/applicants`}>Applicant</Link>
                <Link href={`/${department}/records`}>Records</Link>
            </ul>
        </>
    );
}
