import { ChildrenProps, TextColorMaroonProps } from "@/app/types/type";

export function MaroonBackGround({
    children,
    textColorMaroon,
}: ChildrenProps & TextColorMaroonProps) {
    return (
        <main
            className={`flex min-h-screen flex-col items-center justify-center gap-24 p-24
                ${textColorMaroon ? "bg-red-900" : ""}`}
        >
            {children}
        </main>
    );
}
