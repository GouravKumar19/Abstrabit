import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const requestUrl = new URL(request.url);
    const supabase = createClient();

    await supabase.auth.signOut();

    return NextResponse.redirect(`${requestUrl.origin}/login`, {
        status: 303,
    });
}
