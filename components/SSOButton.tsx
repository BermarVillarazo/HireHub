import { FormProps } from "@/app/types/type";

export default function SSOButton({ formAction, children }: FormProps) {
    return (
        <button
            formAction={formAction}
            className="py-3 px-14 rounded-lg text-xl bg-amber-500 font-bold transform hover:scale-95 duration-200"
        >
            {children}
        </button>
    );
}
