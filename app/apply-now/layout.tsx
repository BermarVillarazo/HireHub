import { ChildrenProps } from "@/app/types/type";
import { validateRequest } from "@/lib/auth";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { redirect } from "next/navigation";

export default async function layout({ children }: ChildrenProps) {
    const { user } = await validateRequest();

    if (user && user?.role === "user") return redirect("/user");
    else if (user && user?.role === "recruitment_staff") return redirect("/recruitment_staff");
    else if (user && user?.role === "representative") {
        if (user?.departmentName) return redirect(`/${user?.departmentName}/requests`);
        else if (user?.officeName) return redirect(`/${user?.officeName}/requests`);
    }

    return (
        <div className="py-5">
            <EdgeStoreProvider>{children}</EdgeStoreProvider>
        </div>
    );
}
