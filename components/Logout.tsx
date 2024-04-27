import { LogoutAction } from "@/action/action";

export default async function Logout() {
    return (
        <form action={LogoutAction}>
            <button>Sign out</button>
        </form>
    );
}
