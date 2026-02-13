"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const schema = z.object({
    title: z.string().min(1),
    url: z.string().url(),
});

export async function addBookmark(prevState: any, formData: FormData) {
    const supabase = createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return { message: "Unauthorized" };
    }

    const parse = schema.safeParse({
        title: formData.get("title"),
        url: formData.get("url"),
    });

    if (!parse.success) {
        return { message: "Invalid input" };
    }

    const { title, url } = parse.data;

    try {
        const { error } = await supabase.from("bookmarks").insert({
            title,
            url,
            user_id: user.id,
        });

        if (error) {
            console.error("Supabase insert error:", error);
            return { message: "Failed to create bookmark" };
        }

        revalidatePath("/dashboard");
        return { message: "Success" };
    } catch (e) {
        console.error(e);
        return { message: "Failed to create bookmark" };
    }
}

export async function deleteBookmark(id: string) {
    const supabase = createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return { message: "Unauthorized" };
    }

    try {
        const { error } = await supabase
            .from("bookmarks")
            .delete()
            .eq("id", id)
            .eq("user_id", user.id);

        if (error) {
            console.error("Supabase delete error:", error);
            return { message: "Failed to delete bookmark" };
        }

        revalidatePath("/dashboard");
        return { message: "Success" };
    } catch (e) {
        console.error(e);
        return { message: "Failed to delete bookmark" };
    }
}
