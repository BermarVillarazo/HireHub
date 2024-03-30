import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "./lib/auth";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const { user } = await validateRequest();
    const url = request.nextUrl;

    if (user?.role === "super_admin" && url.pathname !== "/dashboard/super_admin") {
        return NextResponse.redirect(new URL("/dashboard/super_admin", request.url));
    } else if (user?.role === "hr_head" && url.pathname !== "/dashboard/hr_head") {
        return NextResponse.redirect(new URL("/dashboard/hr_head", request.url));
    } else if (user?.role === "vp_acad" && url.pathname !== "/dashboard/vp_acad") {
        return NextResponse.redirect(new URL("/dashboard/vp_acad", request.url));
    } else if (user?.role === "vp_admin" && url.pathname !== "/dashboard/vp_admin") {
        return NextResponse.redirect(new URL("/dashboard/vp_admin", request.url));
    } else if (user?.role === "user" && url.pathname !== "/dashboard") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        //"/((?!api/|_next/static|_next/image|favicon.ico).*)",
        // https://github.com/vercel/platforms/blob/main/middleware.ts
        "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
    ],
};
