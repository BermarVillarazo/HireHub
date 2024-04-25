import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function layout({
    children,
    params,
}: {
    children: ReactNode;
    params: { department: string[] };
}) {
    const { user } = await validateRequest();

    if (!user) {
        return redirect("/login");
    } else if (user?.role === "super_admin" && params.department[0] !== "super_admin") {
        return redirect("/super_admin");
    } else {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-24 p-24 bg-red-900">
                {children}
            </div>
        );
    }
}
