import { ChildrenProps } from "@/app/types/type";
import { validateRequest } from "@/lib/auth";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { redirect } from "next/navigation";

export default async function layout({ children }: ChildrenProps) {
    const { user } = await validateRequest();

    if (
        (user && user?.role === "user") ||
        user?.role === "hr_head" ||
        user?.role === "super_admin"
    ) {
        return redirect(`/${user?.role}`);
    }

    return (
        <div>
            <EdgeStoreProvider>{children}</EdgeStoreProvider>
        </div>
    );
}
