import Container from "@/components/dashboard/LandingPage";
import { validateRequest } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function LandingPage() {
    const { user } = await validateRequest();

    if (user?.role === "hr_head") {
        return redirect("/hr_head");
    } else if (user?.role) {
        return redirect(`/${user?.role}`);
    } else {
        return (
            <section className="flex min-h-screen flex-col items-center justify-center gap-24 p-24 bg-red-900">
                <Container />
                <Link
                    href={"/login"}
                    className="px-8 py-4 rounded-lg bg-white font-bold transform hover:scale-105 duration-200"
                >
                    Go to Login Page
                </Link>
            </section>
        );
    }
}
