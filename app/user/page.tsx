import Logout from "@/components/Logout";
import { validateRequest } from "@/lib/auth";
import Pending from "@/public/pending.svg";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function User() {
    const { user } = await validateRequest();

    if (!user) return redirect("/login");
    else if (user && user?.departmentName) return redirect(`/${user.departmentName}/requests`);
    else if (user && user?.officeName) return redirect(`/${user.officeName}/requests`);
    else if (user && user?.role === "recruitment_staff") return redirect("/recruitment_staff");
    else if (user && user?.role !== "user") return redirect("/user");

    return (
        <section className="flex flex-col gap-5 justify-center items-center h-screen px-5 py-20 bg-red-900">
            <form method="GET">
                <div className="flex flex-col bg-amber-500 rounded-xl p-5">
                    <h1 className="font-extrabold text-3xl mx-auto">HireHub</h1>
                    <Image
                        src={Pending}
                        alt="Sign in Logo"
                        width={350}
                        height={350}
                        sizes="100vw"
                        priority
                        className="mx-auto  p-5"
                    />
                    <div className="flex flex-col items-center justify-center gap-5 bg-orange-300 p-5 rounded-xl">
                        <p className="w-96 text-base font-bold leading-6 text-gray-900 text-center">
                            Your account has been created. Please wait/contact an admin for account
                            verification.
                        </p>
                    </div>
                </div>
            </form>
            <Logout />
        </section>
    );
}
