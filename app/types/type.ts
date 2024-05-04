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

export const RecruitmentStaffNavigationLinks = [
    { href: "/recruitment_staff", name: "Users" },
    { href: "/recruitment_staff/department", name: "Department" },
    { href: "/recruitment_staff/office", name: "Office" },
];

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

// APPLICANT FORM
export const applicantInputs = [
    { label: "First Name", type: "text", name: "first_name" },
    { label: "Last Name", type: "text", name: "last_name" },
    { label: "Email", type: "email", name: "email" },
    { label: "Contact Number", type: "text", name: "contact_number"  },
]

export const nonTeachingStaff = [
    { value: "EO", label: "Executive Office" },
    { value: "CORE", label: "Center for Communications, Creatives, and Marketing" },
    { value: "MIS", label: "Office of the Management Information System" },
    { value: "CREATE", label: "Center for e-Learning, and Technology Education" },
];

export const teachingStaff = [
    { value: "IT", label: "Department of Information Technology" },
    { value: "IE", label: "Depeartment of Industrial Engineering" },
    { value: "PE", label: "Department of Physical Education" },
    { value: "PHARMA", label: "Department of Pharmacy" },
];