import { ChildrenProps, BackGroundColorMaroon } from "@/app/types/type";

export function MaroonBackGround({
    children,
    backgroundColorMaroon,
}: ChildrenProps & BackGroundColorMaroon) {
    return (
        <main
            className={`flex min-h-screen flex-col items-center justify-center gap-24 p-24
                ${backgroundColorMaroon ? "bg-red-900" : ""}`}
        >
            {children}
        </main>
    );
}
