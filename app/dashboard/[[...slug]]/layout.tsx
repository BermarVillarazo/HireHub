import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function layout({ children }: { children: ReactNode }) {
    const { user } = await validateRequest();

    if (!user) {
        return redirect("/login");
    }

    return <div>{children}</div>;
}
