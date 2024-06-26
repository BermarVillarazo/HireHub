import homepageLogo from "@/public/images/large-logo.png";
import Image from "next/image";

export default function ReusableLoading() {
    return (
        <section className="flex min-h-screen flex-col items-center justify-center gap-24 bg-red-900">
            <div className="flex flex-col justify-center mx-auto text-center text-xl font-bold p-12 bg-white rounded-lg">
                <Image
                    src={homepageLogo}
                    alt="Landing Page Logo"
                    sizes="100vw"
                    priority
                    className="w-40 h-40 animate-spin"
                />
                Processing...
            </div>
        </section>
    );
}
