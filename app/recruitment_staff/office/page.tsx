import { Button, Input, Title } from "../department/page";

export default function Office() {
    return (
        <section>
            <section className="w-10/12 mx-auto mt-10 rounded-lg bg-amber-500">
                <div className="p-10">
                    <Title title="Office" />
                    <form className="flex gap-8 mt-5">
                        <div className="flex flex-1 gap-8">
                            <div className="">
                                <Input name="office_code" placeholder="Office Code" />
                            </div>
                            <div className="w-10/12">
                                <Input name="office_name" placeholder="Office Name" />
                            </div>
                        </div>

                        <Button title="Add Office" />
                    </form>
                </div>
            </section>
            <section className="w-10/12 mx-auto mt-10 rounded-lg bg-amber-500">
                <div className="p-10">
                    <Title title="Lists of Offices" />
                </div>
            </section>
        </section>
    );
}