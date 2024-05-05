export async function getAllUsers() {
    const reponse = await fetch("http://localhost:3000/api/applicant", {
        cache: "no-cache",
    });
    const data = await reponse.json();
    return data;
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
    return data;
}

export async function getAllOffices() {
    const response = await fetch("http://localhost:3000/api/recruitment_staff/office", {
        cache: "no-cache",
    });
    const data = await response.json();
    return data;
}
