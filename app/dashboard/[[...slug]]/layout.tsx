import { MaroonBackGround } from "@/components/ui/MaroonBackground";
import Navbar from "@/components/ui/Navbar";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function layout({
    children,
    params,
}: {
    children: ReactNode;
    params: { slug: string[] };
}) {
    const { user } = await validateRequest();

    if (!user) {
        return redirect("/login");
    }

    if (user?.role === "super_admin" && params.slug[0] !== "super_admin") {
        return redirect("/dashboard/super_admin");
    }

    if (user?.role === "hr_head" && params.slug[0] !== "hr_head") {
        return redirect("/dashboard/hr_head");
    }

    return (
        <MaroonBackGround IsMaroon={true}>
            {user?.role === "hr_head" && params.slug[0] === "hr_head" && <Navbar />}
            {children}
        </MaroonBackGround>
    );
}
