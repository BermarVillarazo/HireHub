import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ChildrenProps } from "../types/type";

export default async function layout({ children }: ChildrenProps) {
    const { user } = await validateRequest();

    if (!user) {
        return redirect("/login");
    } else if (user?.role !== "hr_head") {
        return redirect(`/${user.role}`);
    } else if (user?.role === "hr_head") {
        return <div>{children}</div>;
    }
}
