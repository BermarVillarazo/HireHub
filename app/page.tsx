import { validateRequest } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
    const { user } = await validateRequest();

    if (user?.role === "hr_head") {
        return redirect("/hr_head");
    } else if (user?.role) {
        return redirect(`/${user?.role}`);
    }

    return (
        <section className="flex min-h-screen w-full flex-col items-center text-white justify-center bg-white gap-y-8">
            <div className="h-96 w-1/2 flex items-center justify-center bg-amber-500 rounded-xl">
                <div className="h-full w-full flex flex-row gap-x-10 p-10 justify-center items-center">
                    <div className="w-3/5 flex flex-col text-center gap-y-1.5">
                        <div className="text-5xl font-bold">WORK AT CIT UNIVERSITY</div>
                        <div className="font-semibold">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris
                        </div>
                    </div>
                    <div className="bg-gray-600 w-2/5 h-full rounded-xl" />
                </div>
            </div>

            <Link
                href="/apply-now"
                className="py-3 px-14 rounded-lg text-xl bg-red-900 font-bold transform hover:scale-95 duration-200"
            >
                APPLY NOW
            </Link>
        </section>
    );
}
