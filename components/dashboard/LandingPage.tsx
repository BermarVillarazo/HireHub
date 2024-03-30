import { validateRequest } from "@/lib/auth";
import homepageLogo from "@/public/images/large-logo.png";
import Image from "next/image";
import { ReactNode } from "react";

export default async function LandingPage() {
    const { user } = await validateRequest();

    return (
        <div className="flex items-center justify-center bg-white rounded-lg">
            <Image
                src={homepageLogo}
                alt="Landing Page Logo"
                width={300}
                height={300}
                sizes="100vw"
                priority
            />
            <div className="font-bold pr-7">
                {user && <p className="py-5">Welcome to</p>}
                <h1 className="text-7xl">HireHub</h1>
                {user && <p className="py-5">{user.email}</p>}
                {user ? (
                    <p>YOUR ACCOUNT HAS BEEN LOCKED</p>
                ) : (
                    <p>CIT U HR Applicant Tracking System</p>
                )}
            </div>
        </div>
    );
}

export function Container({ children }: { children: ReactNode }) {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-24 p-24 bg-red-900">
            {children}
        </main>
    );
}
