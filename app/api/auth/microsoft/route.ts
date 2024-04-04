import { generateCodeVerifier, generateState } from "arctic";
import { cookies } from "next/headers";

import { entraId } from "@/lib/auth";

export async function GET(): Promise<Response> {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();

    const url: URL = await entraId.createAuthorizationURL(state, codeVerifier, {
        // optional
        scopes: ["profile", "email"], // "openid" always included
    });

    cookies().set("microsoft_oauth_state", state, {
        path: "/",
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 60 * 10,
        sameSite: "lax",
    });

    cookies().set("microsoft_code_verifier", codeVerifier, {
        path: "/",
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 60 * 10,
        sameSite: "lax",
    });

    return Response.redirect(url);
}
