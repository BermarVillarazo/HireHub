import Image from "next/image";

import SSOButton from "@/components/SSOButton";
import { validateRequest } from "@/lib/auth";
import signInLogo from "@/public/images/signIn-logo.png";
import { redirect } from "next/navigation";

export default async function Login() {
    const { user } = await validateRequest();

    if (user && user?.departmentName) return redirect(`/${user?.departmentName}/requests`);
    else if (user && user?.officeName) return redirect(`/${user?.officeName}/requests`);
    else if (user && user?.role === "recruitment_staff") return redirect("/recruitment_staff");
    else if (user && user?.role === "user") return redirect("/user");

    return (
        <section className="flex min-h-screen justify-center items-center px-5 py-20 bg-red-900">
            <form method="GET">
                <div className="flex flex-col-reverse md:flex-row bg-amber-500 rounded-xl">
                    <Image
                        src={signInLogo}
                        alt="Sign in Logo"
                        width={400}
                        height={400}
                        sizes="100vw"
                        priority
                        className="p-10"
                    />
                    <div className="flex flex-col items-center justify-center gap-5 bg-orange-300 px-10 py-20 rounded-xl">
                        <h1 className="font-extrabold text-3xl">LOGIN</h1>
                        <SSOButton formAction="/api/auth/google">
                            Single Sign in with Google
                        </SSOButton>
                        <SSOButton formAction="/api/auth/microsoft">
                            Single Sign in with Microsoft
                        </SSOButton>
                    </div>
                </div>
            </form>
        </section>
    );
    // }
}
