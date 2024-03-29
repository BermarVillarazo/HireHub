import Image from "next/image";

import Button from "@/components/ui/button";
import { validateRequest } from "@/lib/auth";
import homepageLogo from "@/public/images/large-logo.png";
import { redirect } from "next/navigation";

export default async function Home() {
    const { user } = await validateRequest();

    if (user?.role === "user") {
        const slug = "dashboard";
        return redirect(`/dashboard/${slug}`);
    }

    if (user?.role === "super_admin") {
        const slug = "superadmin";
        return redirect(`/dashboard/${slug}`);
    }

    if (user?.role === "hr_head") {
        const slug = "hr_head";
        return redirect(`/dashboard/${slug}`);
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-24 p-24 bg-red-900">
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
                    <h1 className="text-7xl">HireHub</h1>
                    <p>CIT U HR Applicant Tracking System</p>
                </div>
            </div>
            <div className="flex gap-10">
                <Button title="Single Sign On" loginAdmin="/login" loginSuperAdmin="" />
                {/* <Button
                    title="Single Sign On Super Admin"
                    loginAdmin=""
                    loginSuperAdmin="/superadmin"
                /> */}
            </div>
        </main>
    );
}
