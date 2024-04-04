import { ChildrenProps, TextColorWhiteProps } from "@/app/types/type";

export default function Font({ children, textColorWhite }: ChildrenProps & TextColorWhiteProps) {
    return (
        <h1 className={`text-7xl ${textColorWhite ? "text-white" : "text-white"}`}>{children}</h1>
    );
}
