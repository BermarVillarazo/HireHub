import { User } from "@/lib/schema";
import { ReactNode } from "react";

export type Params = {
    params: {
        slug: string[];
    };
};

export type Props = {
    user: User;
};

export type GetAllUsers = {
    getAllUsers: User;
};

export type UsersProps = {
    id?: string;
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    role?: string;
};

export type ChildrenProps = {
    children: ReactNode;
};

export type BackGroundColorMaroon = {
    backgroundColorMaroon: boolean;
};

export type TextColorWhiteProps = {
    textColorWhite: boolean;
};

export type FormProps = {
    formAction: string;
    children: ReactNode;
};

export type RadioButtonProps = {
    id: string;
    value: string;
    name: string;
    label: string;
};

export interface ApplicantFormProps {
    id: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    email: string | undefined;
    contactNumber: string | undefined;
    resume: string | undefined;
    communicationOption: string | undefined;
    applyingType: string | undefined;
}

export type UrlProps = {
    url: string;
};
