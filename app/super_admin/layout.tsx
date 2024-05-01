import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ChildrenProps } from "../types/type";

export default async function layout({ children }: ChildrenProps) {
    const { user } = await validateRequest();

    if (!user) return redirect("/login");
    else if ((user && user?.role === "user") || user?.role === "hr_head") {
        return redirect(`/${user?.role}`);
    } else if (user && !["user", "super_admin", "hr_head"].includes(user?.role)) {
        return redirect(`/${user?.role}/requests`);
    }

    return <div>{children}</div>;
}
