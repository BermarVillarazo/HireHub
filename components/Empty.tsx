import empty from "@/public/empty.svg";
import { TitleProps } from "@/types/type";
import Image from "next/image";

export default function Empty({ title }: TitleProps) {
    return (
        <section className="flex flex-col justify-center items-center gap-10 h-96">
            <Image src={empty} alt={`${empty}'s SVG`} width={200} height={200} priority />
            <p className="text-lg text-gray-400 font-semibold">{title}</p>
        </section>
    );
}
