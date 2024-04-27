import { ChildrenProps } from "@/app/types/type";
import { validateRequest } from "@/lib/auth";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { redirect } from "next/navigation";

export default async function layout({ children }: ChildrenProps) {
    const { user } = await validateRequest();

    if (user) {
        return redirect(`/${user?.role}`);
    }

    return (
        <div>
            <EdgeStoreProvider>{children}</EdgeStoreProvider>
        </div>
    );
}
