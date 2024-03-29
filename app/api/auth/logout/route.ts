import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET(): Promise<Response> {
    const sessionCookie = lucia.createBlankSessionCookie();

    cookies().set("auth_session", sessionCookie.serialize());
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    return new Response(null, {
        status: 302,
        headers: {
            Location: "/",
        },
    });
}
