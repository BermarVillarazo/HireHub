import { validateRequest } from "@/lib/auth";
import { ChildrenProps } from "../types/type";
import { redirect } from "next/navigation";

export default async function layout({ children }: ChildrenProps) {
    const { user } = await validateRequest();

    if (!user) {
        return redirect("/login");
    } else if (user?.role === "hr_head") {
        return <div>{children}</div>;
    }
}
