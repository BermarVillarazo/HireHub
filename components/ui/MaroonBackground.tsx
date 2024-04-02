import { ReactNode } from "react";

export function MaroonBackGround({ children }: { children: ReactNode }) {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-24 p-24 bg-red-900">
            {children}
        </main>
    );
}
