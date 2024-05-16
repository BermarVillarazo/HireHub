import { ChildrenProps } from "@/app/types/type";

export default function Button({ children }: ChildrenProps) {
    return (
        <button type="submit" className="w-full md:w-64 py-3 px-14 rounded-lg text-white text-center bg-red-900 font-bold transition hover:scale-95 duration-200">
            {children}
        </button>
    );
}
