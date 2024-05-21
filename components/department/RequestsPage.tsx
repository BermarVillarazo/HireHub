"use client";

import Link from "next/link";
import Button from "../Button";
import { Title } from "../Title";

type RequestPageProps = {
    department: string;
};

export default function RequestsPage({ department }: RequestPageProps) {
    return (
        <>
            <section className="w-full p-5">
                <section className="flex justify-between items-center">
                    <Title title="REQUEST DETAILS" />
                    <Button>
                        <Link href={`/${department}/requests/form`}>New Request</Link>
                    </Button>
                </section>
                <section className="details-section w-full bg-black rounded-lg mt-5 p-16 text-white flex flex-col gap-y-8">
                    DEFAULT DISPLAY REQUESTS.
                </section>
            </section>
        </>
    );
}
