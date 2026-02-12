"use server";

import { prisma } from "@/lib/prisma";
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
        await prisma.bookmark.create({
            data: {
                title,
                url,
                userId: user.id,
            },
        });

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
        // Verify ownership
        const bookmark = await prisma.bookmark.findUnique({
            where: { id },
        });

        if (!bookmark || bookmark.userId !== user.id) {
            return { message: "Unauthorized" };
        }

        await prisma.bookmark.delete({
            where: { id },
        });

        revalidatePath("/dashboard");
        return { message: "Success" };
    } catch (e) {
        console.error(e);
        return { message: "Failed to delete bookmark" };
    }
}
