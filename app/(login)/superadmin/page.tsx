import Image from "next/image";

import signInLogo from "@/public/images/signIn-logo.png";

type Message = { searchParams: { message: string } };

export default function Login({ searchParams }: Message) {
    return (
        <form
            action="/api/auth/google"
            method="GET"
            className="flex min-h-screen w-full flex-col items-center justify-center bg-red-900"
        >
            <div className="flex bg-amber-500">
                <Image
                    src={signInLogo}
                    alt="Sign in Logo"
                    width={400}
                    height={400}
                    sizes="100vw"
                    priority
                    className="p-10"
                />
                <div className="flex flex-col items-center justify-center gap-5 bg-orange-300 px-5">
                    <h1 className="font-extrabold text-3xl">SUPER ADMIN LOGIN</h1>
                    <button className="py-3 px-14 rounded-lg text-xl bg-amber-500 font-bold transform hover:scale-95 duration-200">
                        Sign in using Google
                    </button>
                </div>
            </div>
            {searchParams?.message && (
                <p className="mt-4 bg-foreground/10 p-4 text-center text-foreground">
                    {searchParams.message}
                </p>
            )}
        </form>
    );
}
