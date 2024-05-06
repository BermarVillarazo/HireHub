import { getAllOffices } from "@/app/GET/GET";
import OfficeForm from "@/components/recruitment_staff/OfficeForm";
import OfficeLists from "@/components/recruitment_staff/OfficeLists";
import { Title } from "../department/page";

export default async function OfficePage() {
    const offices = await getAllOffices();

    return (
        <section className="py-10">
            <section className="w-10/12 mx-auto rounded-lg bg-amber-500">
                <div className="p-10">
                    <Title title="Department" />
                    <OfficeForm />
                </div>
            </section>
            <section className="w-10/12 mx-auto mt-10 rounded-lg bg-amber-500">
                <div className="p-10">
                    <Title title="Lists of Departments" />
                    <OfficeLists offices={offices} />
                </div>
            </section>
        </section>
    );
}
