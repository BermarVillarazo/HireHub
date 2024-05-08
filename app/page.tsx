import Button from "@/components/Button";
import { validateRequest } from "@/lib/auth";
import homepageLogo from "@/public/images/large-logo.png";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
    const { user } = await validateRequest();

    if (user && user?.role === "user") return redirect("/user");
    else if (user && user?.role === "recruitment_staff") return redirect("/recruitment_staff");
    else if (user && user?.role === "representative") {
        if (user?.departmentName) return redirect(`/${user?.departmentName}/requests`);
        else if (user?.officeName) return redirect(`/${user?.officeName}/requests`);
    }

    return (
        <section className="flex min-h-screen w-full flex-col items-center p-5 sm:p-14 md:p-10 text-white justify-center bg-white gap-y-8">
            <div className="xl:w-4/6 bg-amber-500 rounded-xl">
                <div className="h-full px-4 py-10 md:p-8 w-full flex flex-col md:flex-row justify-between items-center">
                    <div className="md:w-3/5 flex flex-col gap-5 text-center">
                        <div className="text-4xl md:text-5xl font-semibold xl:font-bold">
                            WORK AT CIT UNIVERSITY
                        </div>
                        <div className="font-semibold text-lg">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris
                        </div>
                    </div>
                    <Image
                        src={homepageLogo}
                        alt="Landing Page Logo"
                        width={300}
                        height={300}
                        priority
                    />
                </div>
            </div>

            <Button>
                <Link href="/apply-now" className="text-xl">
                    APPLY NOW
                </Link>
            </Button>
        </section>
    );
}
