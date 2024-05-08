import { ChildrenProps } from "@/app/types/type";

export default function Button({ children }: ChildrenProps) {
    return (
        <button className="w-full md:w-64 py-3 px-14 rounded-lg text-white text-center bg-red-900 font-bold transform hover:scale-95 duration-200">
            {children}
        </button>
    );
}
