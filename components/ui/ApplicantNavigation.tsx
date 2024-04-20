"use client";

import { usePathname } from "next/navigation";

export default function ApplicantNavigation() {
    const pathname = usePathname();

    const landingPage = pathname.endsWith("/");
    const applyNowPage = pathname === "/apply-now";

    return (
        <>
            {(applyNowPage || landingPage) && (
                <nav className="h-20 w-full bg-red-900 text-white flex items-center px-6">
                    <p>Hirehub</p>
                    <div className="flex-grow"></div>
                    <p>Contact Us</p>
                </nav>
            )}
        </>
    );
}
