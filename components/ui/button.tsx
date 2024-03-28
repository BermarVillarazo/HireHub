"use client";

import { useRouter } from "next/navigation";

export default function Button() {
    const router = useRouter();

    function handleRoute() {
        router.push("/login");
    }

    return (
        <button
            onClick={handleRoute}
            className="px-8 py-4 rounded-lg bg-white font-bold tracking-widest uppercase transform hover:scale-105 duration-200"
        >
            Single Sign On
        </button>
    );
}
