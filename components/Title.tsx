import { TitleProps } from "@/app/types/type";

export function Title({ title }: TitleProps) {
    return <h1 className="text-xl font-bold">{title}</h1>;
}
