import { lucia, validateRequest } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Logout() {
    return (
        <form
            action={LogoutAction}
            className="group font-bold relative m-1 inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-lg border-b-2 border-l-2 border-r-2 border-red-900 bg-gradient-to-tr from-red-700 to-red-800 px-4 py-1 text-white shadow-lg transition duration-100 ease-in-out active:translate-y-0.5 hover:scale-90 active:shadow-none"
        >
            <button>Logout</button>
        </form>
    );
}

interface ActionResult {
    error: string | null;
}

export async function LogoutAction(): Promise<ActionResult> {
    "use server";
    const { session } = await validateRequest();
    if (!session) {
        return {
            error: "Unauthorized",
        };
    }

    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return redirect("/login");
}
