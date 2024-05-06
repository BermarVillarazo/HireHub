import { ApplicantSelect, DepartmentSelect, OfficeInsert, User } from "@/lib/schema";

export async function getAllUsers() {
    const reponse = await fetch("http://localhost:3000/api/applicant", {
        cache: "no-cache",
    });
    const data = await reponse.json();
    const users: User[] = data.users;
    return users;
}

export async function getAllRecruiter() {
    const reponse = await fetch("http://localhost:3000/api/recruitment_staff", {
        cache: "no-cache",
    });
    const data = await reponse.json();
    return data;
}

export async function getUsersbyID() {
    const reponse = await fetch("http://localhost:3000/api/getuser", {
        cache: "no-cache",
    });
    const data = await reponse.json();
    return data;
}

export async function getAllDepartments() {
    const response = await fetch("http://localhost:3000/api/recruitment_staff/department", {
        cache: "no-cache",
    });
    const data = await response.json();
    const departments: DepartmentSelect[] = data.departments;
    return departments;
}

export async function getAllOffices() {
    const response = await fetch("http://localhost:3000/api/recruitment_staff/office", {
        cache: "no-cache",
    });
    const data = await response.json();
    const offices: OfficeInsert[] = data.offices
    return offices;
}

export async function getAllApplicants() {
    const response = await fetch("http://localhost:3000/api/recruitment_staff/applicant", {
        cache: "no-cache",
    });
    const data = await response.json();
    const applicants: ApplicantSelect[] = data.applicants;
    return applicants;
}
