import { User } from "@/lib/schema";
import { ReactNode } from "react";

export interface ActionResult {
    error: string | null;
}

export type DepartmentProps = {
    params: {
        department: string;
    };
};

export const SHSNavigation = [
    { href: "/shs/requests", name: "Requests" },
    { href: "/shs/applicants", name: "Applicants" },
    { href: "/shs/records", name: "Records" },
];

export const CCSNavigation = [
    { href: "/ccs/requests", name: "Requests" },
    { href: "/ccs/applicants", name: "Applicants" },
    { href: "/ccs/records", name: "Records" },
];

// export const CENavigation = [
//     { href: "/ce/requests", name: "Requests" },
//     { href: "/ce/applicants", name: "Applicants" },
//     { href: "/ce/records", name: "Records" },
// ];

export type UserProps = {
    user: User;
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