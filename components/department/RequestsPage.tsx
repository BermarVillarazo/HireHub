"use client";

import Image from "next/image";
import Link from "next/link";
import { Title } from "../Title";

type RequestPageProps = {
    department: string;
};

export default function RequestsPage({ department }: RequestPageProps) {
    return (
        <>
            <section className="w-full p-5">
                <section className="flex justify-between items-center">
                    <Title title="Request Details" />
                </section>
                <section className="details-section w-full bg-gradient-to-r from-[#7F0000] to-[#d9a5a5] rounded-2xl mt-5 text-white flex flex-col gap-y-4 items-center shadow-2xl">
                    <Image src="/Checklist-pana.svg" width={300} height={300} alt="Checklist" />
                    <div className="w-full bg-white text-slate-700 p-6 rounded-b-2xl">
                        <h1 className="text-left font-bold text-3xl mb-2">Welcome!</h1>
                        <p className="text-slate-500 mb-6">
                            Here, you can view, manage, and track all your submitted requests. Stay
                            organized and keep an eye on the status and updates of each request in
                            one convenient place.
                        </p>
                        <button className="px-4 py-2 bg-red-900 text-white rounded-lg text-sm hover:bg-red-800 duration-500">
                            <Link href={`/${department}/requests/form`}>New Request</Link>
                        </button>
                    </div>
                </section>
            </section>
        </>
    );
}
