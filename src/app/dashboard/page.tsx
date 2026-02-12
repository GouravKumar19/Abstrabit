import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AddBookmarkForm from "@/components/AddBookmarkForm";
import BookmarkList from "@/components/BookmarkList";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
    const supabase = createClient();
    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
        redirect("/login");
    }

    const bookmarks = await prisma.bookmark.findMany({
        where: {
            userId: session.user.id,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    // Serialize dates for client component
    const safeBookmarks = bookmarks.map((b) => ({
        ...b,
        createdAt: b.createdAt.toISOString(),
    }));

    return (
        <div className="min-h-screen p-8">
            <div className="mx-auto max-w-6xl">
                <header className="mb-12 flex items-center justify-between">
                    <div>
                        <h1 className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-4xl font-extrabold text-transparent">
                            Smart Bookmarks
                        </h1>
                        <p className="mt-2 text-gray-600 dark:text-gray-400 font-medium">
                            Your private, real-time collection.
                        </p>
                    </div>

                    <form action="/auth/signout" method="post">
                        <button className="rounded-lg bg-white/50 px-4 py-2 text-sm font-medium text-gray-700 backdrop-blur-sm transition-all hover:bg-white hover:shadow-md dark:bg-white/10 dark:text-gray-200 dark:hover:bg-white/20 ring-1 ring-gray-900/5">
                            Sign Out
                        </button>
                    </form>
                </header>
                <main>
                    <div className="mb-12 rounded-2xl p-1 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10">
                        <div className="rounded-xl bg-white/60 p-6 shadow-sm backdrop-blur-xl dark:bg-black/40 border border-white/20">
                            <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-200">Add New Bookmark</h2>
                            <AddBookmarkForm />
                        </div>
                    </div>

                    <BookmarkList initialBookmarks={safeBookmarks} userId={session.user.id} />
                </main>
            </div>
        </div>
    );
}
