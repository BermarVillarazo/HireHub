"use client";

import NavbarLogo from "@/public/images/navbar-logo.png";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function ApplicantNavigation() {
    const pathname = usePathname();

    const landingPage = pathname === "/";
    const applyNowPage = pathname === "/apply-now";

    return (
        <>
            {(landingPage || applyNowPage) && (
                <nav className="h-20 w-full bg-red-900 text-lg flex justify-between items-center px-6">
                    <div className="bg-white py-1.5 px-2 text-black rounded-xl">
                        <p className="flex items-center font-bold">
                            <Image
                                src={NavbarLogo}
                                alt="CIT-U Logo"
                                className="w-12 h-12"
                                priority
                            />
                            Hirehub
                        </p>
                    </div>
                    <p className="text-white">Contact Us</p>
                </nav>
            )}
        </>
    );
}
