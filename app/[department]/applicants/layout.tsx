import SidebarApplicant from "@/components/department/SidebarApplicant";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

type LayoutProps = {
    children: ReactNode;
    params: { department: string };
};

export default async function layout({ children, params }: LayoutProps) {
    return (
        <main className="flex max-w-screen-xl mx-auto">
            <SidebarApplicant department={params.department} />
            {children}
        </main>
    );
}
