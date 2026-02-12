import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });

    const {
        data: { user },
    } = await supabase.auth.getUser();

    // If no user and trying to access protected route, redirect to login
    if (!user && req.nextUrl.pathname !== "/login" && req.nextUrl.pathname !== "/" && !req.nextUrl.pathname.startsWith("/auth")) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // If user and trying to access login, redirect to dashboard
    if (user && req.nextUrl.pathname === "/login") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return res;
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
