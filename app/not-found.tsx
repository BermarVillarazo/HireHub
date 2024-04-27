import homepageLogo from "@/public/images/large-logo.png";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
    return (
        <section className="flex min-h-screen flex-col items-center justify-center gap-24 p-24 bg-red-900">
            <div className="flex items-center flex-col justify-center p-12 bg-white rounded-lg">
                <Image
                    src={homepageLogo}
                    alt="Landing Page Logo"
                    width={300}
                    height={300}
                    sizes="100vw"
                    priority
                />
                <div className="flex text-center flex-col text-black">
                    <p className="text-xl font-semibold">Oops, Page not found.</p>
                    <p className="text-md">
                        Back to <Link href={"/"} className="underline hover:text-red-900">homepage</Link>.
                    </p>
                </div>
            </div>
        </section>
    );
}
