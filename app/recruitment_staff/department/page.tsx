import { InputProps, TitleProps } from "@/app/types/type";

export default function Department() {
    return (
        <section>
            <section className="w-10/12 mx-auto mt-10 rounded-lg bg-amber-500">
                <div className="p-10">
                    <Title title="Department" />
                    <form className="flex gap-8 mt-5">
                        <div className="flex flex-1 gap-8">
                            <div className="">
                                <Input name="department_code" placeholder="Department Code" />
                            </div>
                            <div className="w-10/12">
                                <Input name="department_name" placeholder="Department Name" />
                            </div>
                        </div>

                        <Button title="Add Department" />
                    </form>
                </div>
            </section>
            <section className="w-10/12 mx-auto mt-10 rounded-lg bg-amber-500">
                <div className="p-10">
                    <Title title="Lists of Departments" />
                </div>
            </section>
        </section>
    );
}

export function Title({ title }: TitleProps) {
    return <h1 className="text-3xl font-bold text-white">{title}</h1>;
}

export function Input({ name, placeholder }: InputProps) {
    return (
        <input
            type="text"
            name={name}
            placeholder={placeholder}
            className="block w-full p-3 text-sm text-black border border-gray-300 rounded-lg dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
    );
}

export function Button({ title }: TitleProps) {
    return (
        <button
            type="submit"
            className="text-white bg-red-900 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-900 font-medium rounded-lg text-sm px-3 py-1.5"
        >
            {title}
        </button>
    );
}