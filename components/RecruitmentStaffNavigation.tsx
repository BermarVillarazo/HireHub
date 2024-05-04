"use client";

import { RecruitmentStaffNavigationLinks } from "@/app/types/type";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
    const [nav, setNav] = useState(false);

    function handleNav() {
        setNav(!nav);
    }

    return (
        <div className="bg-red-900 flex justify-between items-center h-20 w-full mx-auto px-4 text-white">
            {/* Logo */}
            <h1 className="w-full text-3xl font-bold">HireHub</h1>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex">
                {RecruitmentStaffNavigationLinks.map(({ href, name }) => (
                    <Link
                        key={href}
                        href={href}
                        className="p-4 rounded-xl m-2 cursor-pointer duration-300 hover:text-black"
                    >
                        {name}
                    </Link>
                ))}
            </ul>

            {/* Mobile Navigation Icon */}
            <div onClick={handleNav} className="block md:hidden">
                {nav ? "Close" : "Open"}
            </div>

            {/* Mobile Navigation Menu */}
            <ul
                className={
                    nav
                        ? "fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-red-900 ease-in-out duration-500"
                        : "ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]"
                }
            >
                {/* Mobile Logo */}
                <h1 className="w-full text-3xl font-bold m-4">HireHub</h1>

                {/* Mobile Navigation Items */}
                {RecruitmentStaffNavigationLinks.map(({ href, name }) => (
                    <li key={href} className="p-4 m-2">
                        <Link
                            href={href}
                            className="rounded-xl cursor-pointer duration-300 hover:text-black"
                        >
                            {name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
