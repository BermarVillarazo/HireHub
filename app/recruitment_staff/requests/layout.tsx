import AllSidebarRequest from "@/components/recruitment_staff/AllSidebarRequest";
import { ReactNode } from "react";

type LayoutProps = {
    children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
    return (
        <main className="flex max-w-screen-xl mx-auto">
            <AllSidebarRequest />
            {children}
        </main>
    );
}
