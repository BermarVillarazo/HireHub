import { validateRequest } from "@/lib/auth";
import homepageLogo from "@/public/images/large-logo.png";
import Image from "next/image";
import Font from "../Font";

export default async function Container() {
    const { user } = await validateRequest();

    return (
        <div className="flex flex-col md:flex-row items-center justify-between w-11/12 md:w-10/12 max-w-[680px] bg-white rounded-lg md:p-5">
            <Image
                src={homepageLogo}
                alt="Landing Page Logo"
                sizes="100vw"
                priority
                className="w-60 h-60 md:w-72 md:h-72"
            />
            <div className="w-11/12 md:w-96 pb-5 text-center font-bold">
                <Font textColorWhite={false}>HireHub</Font>
                <p>CIT U HR Applicant Tracking System</p>
            </div>
        </div>
    );
}
