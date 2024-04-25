import { ChildrenProps } from "@/app/types/type";
import { EdgeStoreProvider } from "@/lib/edgestore";

export default function layout({ children }: ChildrenProps) {
    return (
        <div>
            <EdgeStoreProvider>{children}</EdgeStoreProvider>
        </div>
    );
}
