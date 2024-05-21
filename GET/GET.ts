import {
    ApplicantSelect,
    DepartmentSelect,
    JobRequestSelect,
    OfficeSelect,
    User,
} from "@/lib/schema";

const baseUrl =
    process.env.NODE_ENV === "production"
        ? "https://cit-application-tracker.vercel.app"
        : process.env.NODE_ENV === "development" && "http://localhost:3000";

async function FetchApi(url: string) {
    try {
        const response = await fetch(url, {
            cache: "no-cache",
            method: "GET",
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Fetch API error: ${url}`);
        return null; // Return null or handle the error appropriately
    }
}

export async function getAllUsers() {
    const data = await FetchApi(`${baseUrl}/api/applicant`);
    const users: User[] = data.users;
    return users;
}

export async function getAllRecruiter() {
    const data = await FetchApi(`${baseUrl}/api/recruitment_staff`);
    return data;
}

export async function getUsersbyID() {
    const data = await FetchApi(`${baseUrl}/api/getuser`);
    return data;
}

// export async function getAllDepartments() {
//     const data = await FetchApi(`${baseUrl}/api/recruitment_staff/department`);
//     const departments: DepartmentSelect[] = data.departments;
//     return departments;
// }

// export async function getAllOffices() {
//     // const response = await fetch("http://localhost:3000/api/recruitment_staff/office", {
//     //     cache: "no-cache",
//     // });
//     // const data = await response.json();
//     const data = await FetchApi(`${baseUrl}/api/recruitment_staff/office`);
//     const offices: OfficeSelect[] = data.offices;
//     return offices;
// }

export async function getAllOfficesById(id: string) {
    const data = await FetchApi(`${baseUrl}/api/representative/job_request/${id}`);
    const jobRequest: JobRequestSelect[] = data.jobRequest;
    return jobRequest;
}

export async function getAllApplicants() {
    const data = await FetchApi(`${baseUrl}/api/recruitment_staff/applicant`);
    const applicants: ApplicantSelect[] = data.applicants;
    return applicants;
}

export async function getApplicantById(id: string) {
    const data = await FetchApi(`${baseUrl}/api/applicant/${id}`);
    return data;
}

// GETS ALL THE APPLICANT LISTS FOR A PARTICULAR DEPARTMENT OR OFFICE
// DEPENDING ON THE NAME PASSED
// THE NAME IS EITHER THE DEPARTMENT NAME OR OFFICE NAME
export async function getAllApplicantsLists(name: string) {
    const department = await FetchApi(
        `${baseUrl}/api/representative/department/applicants/${name}`
    );
    const office = await FetchApi(`${baseUrl}/api/representative/office/applicants/${name}`);
    const departmentApplicants: ApplicantSelect[] = department?.applicants;
    const officeApplicants: ApplicantSelect[] = office?.applicants;
    return { departmentApplicants, officeApplicants };
}

// GETS ALL THE JOB REQUESTS LISTS FOR A PARTICULAR DEPARTMENT OR OFFICE
// DEPENDING ON THE NAME PASSED
// THE NAME IS EITHER THE DEPARTMENT NAME OR OFFICE NAME
export async function getAllDeptartmentOrOfficeRequests(name: string) {
    const department = await FetchApi(`${baseUrl}/api/representative/department/${name}`);
    const office = await FetchApi(`${baseUrl}/api/representative/office/${name}`);
    const departmentJobRequests: JobRequestSelect[] = department?.departmentRequests;
    const officeJobRequests: JobRequestSelect[] = office?.officeRequests;
    return { departmentJobRequests, officeJobRequests };
}
// 
// 
// 

export async function getAllApplicantsOffice(name: string) {
    const data = await FetchApi(`${baseUrl}/api/representative/office/applicants/${name}`);
    const applicants: ApplicantSelect[] = data.applicants;
    return applicants;
}

export async function getAllJobRequests() {
    const data = await FetchApi(`${baseUrl}/api/recruitment_staff/applicant`);
    const applicants: ApplicantSelect[] = data.applicants;
    return applicants;
}
