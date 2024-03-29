"use client";

import { useRouter } from "next/navigation";

type Route = {
    title: string;
    loginAdmin: string;
    loginSuperAdmin: string;
};

export default function Button({ title, loginAdmin, loginSuperAdmin }: Route) {
    const router = useRouter();

    function handleRoute() {
        router.push(loginAdmin || loginSuperAdmin);
    }

    return (
        <button
            onClick={handleRoute}
            className="px-8 py-4 rounded-lg bg-white font-bold tracking-widest uppercase transform hover:scale-105 duration-200"
        >
            {title}
        </button>
    );
}
