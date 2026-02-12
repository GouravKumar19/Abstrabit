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
    } else {
        console.error("No code found in callback URL");
        return NextResponse.redirect(`${origin}/login?error=no_code`);
    }

    console.log("Auth session exchanged successfully. Redirecting to dashboard.");
    // URL to redirect to after sign in process completes
    return NextResponse.redirect(`${origin}/dashboard`);
}
