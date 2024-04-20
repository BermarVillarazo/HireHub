import Image from "next/image";

import SSOButton from "@/components/SSOButton";
import signInLogo from "@/public/images/signIn-logo.png";

export default function Login() {
    return (
        <section className="flex min-h-screen flex-col items-center justify-center gap-24 p-24 bg-red-900">
            <form method="GET">
                <div className="flex bg-amber-500 rounded-xl">
                    <Image
                        src={signInLogo}
                        alt="Sign in Logo"
                        width={400}
                        height={400}
                        sizes="100vw"
                        priority
                        className="p-10"
                    />
                    <div className="flex flex-col items-center justify-center gap-5 bg-orange-300 px-5 rounded-xl">
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
}
