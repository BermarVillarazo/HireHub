import { ChildrenProps } from "@/app/types/type";

type TextColorWhiteProps = {
    textColorWhite: boolean;
};

export default function Font({ children, textColorWhite }: ChildrenProps & TextColorWhiteProps) {
    return (
        <h1 className={`text-7xl ${textColorWhite ? "text-white" : "text-black"}`}>{children}</h1>
    );
}
