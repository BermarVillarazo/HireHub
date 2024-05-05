import { User } from "@/lib/schema";
import { ReactNode } from "react";
import { z } from "zod";

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
  { href: "/recruitment_staff/applicant", name: "Applicant" },
];

export const CCSNavigation = [
  { href: "/ccs/requests", name: "Requests" },
  { href: "/ccs/applicants", name: "Applicants" },
  { href: "/ccs/records", name: "Records" },
];

export type UserProps = {
  user: User;
};

export type ChildrenProps = {
  children: ReactNode;
};

export type BackGroundColorMaroon = {
  backgroundColorMaroon: boolean;
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
  { label: "Contact Number", type: "text", name: "contact_number" },
];

export const nonTeachingStaff = [
  { value: "EO", label: "Executive Office" },
  {
    value: "CORE",
    label: "Center for Communications, Creatives, and Marketing",
  },
  { value: "MIS", label: "Office of the Management Information System" },
  { value: "CREATE", label: "Center for e-Learning, and Technology Education" },
];

export const teachingStaff = [
  { value: "IT", label: "Department of Information Technology" },
  { value: "IE", label: "Depeartment of Industrial Engineering" },
  { value: "PE", label: "Department of Physical Education" },
  { value: "PHARMA", label: "Department of Pharmacy" },
];

// RECRUITMENT STAFF
export type InputProps = {
  name: string;
  placeholder: string;
};

export type TitleProps = {
  title: string;
};

// DEPARTMENT TYPE
export type DepartmentListsProps = {
  departments: {
    department_id?: number;
    department_name?: string;
    department_code?: string;
  };
};

// OFFICE TYPE
export type OfficeListsProps = {
  offices: {
    office_id?: number;
    office_name?: string;
    office_code?: string;
  };
};

// API ZOD VALIDATION
export const requirementStaffDepartmentSchema = z.object({
  department_name: z
    .string()
    .min(1, { message: "Department Name must have 2 or more characters" })
    .max(256, { message: "Department Name must have 256 or less characters" }),
  department_code: z
    .string()
    .min(1, { message: "Department Code must have 2 or more characters" })
    .max(256, { message: "Department Code must have 256 or less characters" }),
});

export type requirementStaffDepartmentSchemaProps = z.infer<
  typeof requirementStaffDepartmentSchema
>;

// USAGE: app/api/recruitment_staff/staff/department/[id]
export type ParamsProps = {
  params: {
    id: string;
  };
};

export const departmentSchema = z.object({
  department_name: z
    .string()
    .min(1, { message: "Department Name must have 2 or more characters" })
    .max(256, { message: "Department Name must have 256 or less characters" }),
  department_code: z
    .string()
    .min(1, { message: "Department Code must have 2 or more characters" })
    .max(256, { message: "Department Code must have 256 or less characters" }),
});

export type departmentSchemaProps = z.infer<typeof departmentSchema>;

export const staffDepartmentSchema = z.object({
  departmentName: z.string(),
});

export type staffDepartmentSchemaProps = z.infer<typeof staffDepartmentSchema>;

// API ZOD VALIDATION | OFFICE SCHEMA
export const officeSchema = z.object({
  office_name: z
    .string()
    .min(1, { message: "office Name must have 2 or more characters" })
    .max(256, { message: "office Name must have 256 or less characters" }),
  office_code: z
    .string()
    .min(1, { message: "office Code must have 2 or more characters" })
    .max(256, { message: "office Code must have 256 or less characters" }),
});

export type officeSchemaProps = z.infer<typeof officeSchema>;
