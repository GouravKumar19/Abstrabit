import { createClient } from "@/lib/supabase/route";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");
    const origin = requestUrl.origin;

    if (code) {
        const supabase = createClient();
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (error) {
            console.error("Auth Error in Callback:", error);
            return NextResponse.redirect(`${origin}/login?error=auth_code_error`);
        }

        // Debug: Check if session is actually set
        const { data: { session } } = await supabase.auth.getSession();
        console.log("Session after exchange:", session ? "Created" : "Null");
    } else {
        console.error("No code found in callback URL");
        return NextResponse.redirect(`${origin}/login?error=no_code`);
    }

    console.log("Auth session exchanged successfully. Redirecting to dashboard.");
    return NextResponse.redirect(`${origin}/dashboard`);
}
