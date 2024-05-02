export async function getAllUsers() {
    const reponse = await fetch("http://localhost:3000/api/applicant", {
        cache: "no-cache",
    });
    const data = await reponse.json();
    return data;
}

export async function getUsersbyID(){
    const reponse = await fetch("http://localhost:3000/api/getuser", {
        cache: "no-cache",
    });
    const data = await reponse.json();
    return data;
}