import { getAllOffices } from "@/app/GET/GET";
import OfficeForm from "@/components/recruitment_staff/OfficeForm";
import OfficeLists from "@/components/recruitment_staff/OfficeLists";
import { ReactNode } from "react";

export default async function OfficePage() {
    const offices = await getAllOffices();

    return (
        <section className="py-10">
            <section className="w-10/12 mx-auto rounded-lg bg-amber-500">
                <div className="p-10">
                    <Title>Office</Title>
                    <OfficeForm />
                </div>
            </section>
            <section className="w-10/12 mx-auto mt-10 rounded-lg bg-amber-500">
                <div className="p-10">
                    <Title>Lists of Offices</Title>
                    <OfficeLists offices={offices} />
                </div>
            </section>
        </section>
    );
}

function Title({ children }: { children: ReactNode }) {
    return <h1 className="text-3xl font-bold text-white">{children}</h1>;
}
