"use client";

import { RecruitmentStaffNavigationLinks } from "@/types/type";
import Link from "next/link";
import { useState } from "react";

export default function RecruitmentStaffNavigation() {
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
                        ? "fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-red-900 ease-in-out duration-500"
                        : "ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]"
                }
            >
                <h1 className="w-full text-3xl font-bold m-4">HireHub</h1>

                {RecruitmentStaffNavigationLinks.map(({ href, name }) => (
                    <li key={href} className="py-2 px-5">
                        <Link
                            href={href}
                            className="group font-bold relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-lg hover:border-red-900 bg-gradient-to-tr hover:from-red-700 hover:to-red-800 p-5 text-white hover:shadow-lg transition duration-100 ease-in-out active:translate-y-0.5 hover:scale-90 active:shadow-none"
                        >
                            {name}
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
}
