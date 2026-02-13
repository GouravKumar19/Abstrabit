"use client";

import { deleteBookmark } from "@/app/actions";
import { createClient } from "@/lib/supabase/client";
import { SafeBookmark } from "@/types";
import { useEffect, useMemo, useState } from "react";
import { Trash2, ExternalLink } from "lucide-react";

interface BookmarkListProps {
    initialBookmarks: SafeBookmark[];
    userId: string;
}

export default function BookmarkList({
    initialBookmarks,
    userId,
}: BookmarkListProps) {
    const [bookmarks, setBookmarks] = useState<SafeBookmark[]>(initialBookmarks);
    const supabase = useMemo(() => createClient(), []);

    useEffect(() => {
        setBookmarks(initialBookmarks);
    }, [initialBookmarks]);

    useEffect(() => {
        const channel = supabase
            .channel("realtime-bookmarks")
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "bookmarks",
                    filter: `user_id=eq.${userId}`,
                },
                (payload) => {
                    console.log("Realtime event received:", payload.eventType, payload);
                    if (payload.eventType === "INSERT") {
                        const newBookmark = payload.new as any;
                        setBookmarks((prev) => {
                            // Avoid duplicates
                            if (prev.some(b => b.id === newBookmark.id)) return prev;
                            return [
                                {
                                    ...newBookmark,
                                    createdAt: newBookmark.created_at,
                                    userId: newBookmark.user_id,
                                } as SafeBookmark,
                                ...prev,
                            ];
                        });
                    } else if (payload.eventType === "DELETE") {
                        setBookmarks((prev) =>
                            prev.filter((bookmark) => bookmark.id !== payload.old.id)
                        );
                    } else if (payload.eventType === "UPDATE") {
                        const updatedBookmark = payload.new as any;
                        setBookmarks((prev) =>
                            prev.map((bookmark) =>
                                bookmark.id === updatedBookmark.id
                                    ? ({
                                        ...updatedBookmark,
                                        createdAt: updatedBookmark.created_at,
                                        userId: updatedBookmark.user_id,
                                    } as SafeBookmark)
                                    : bookmark
                            )
                        );
                    }
                }
            )
            .subscribe((status) => {
                console.log("Realtime subscription status:", status);
            });

        return () => {
            supabase.removeChannel(channel);
        };
    }, [supabase, userId]);

    const handleDelete = async (id: string) => {
        setBookmarks(prev => prev.filter(b => b.id !== id));
        await deleteBookmark(id);
    };

    if (bookmarks.length === 0) {
        return (
            <div className="text-center py-10 text-gray-500 glass rounded-xl">
                <p>No bookmarks yet. Add one above!</p>
            </div>
        )
    }

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {bookmarks.map((bookmark) => (
                <div
                    key={bookmark.id}
                    className="group relative flex flex-col justify-between rounded-xl p-6 transition-all hover:scale-[1.02] glass"
                >
                    <div>
                        <div className="mb-2 flex items-start justify-between">
                            <h3 className="truncate text-lg font-semibold text-gray-900 dark:text-white" title={bookmark.title}>
                                {bookmark.title}
                            </h3>
                            <a
                                href={bookmark.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                            >
                                <ExternalLink className="h-5 w-5" />
                            </a>
                        </div>
                        <p className="line-clamp-2 text-sm text-gray-500 dark:text-gray-400 break-all">
                            {bookmark.url}
                        </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between pt-4 border-t border-gray-100/20 dark:border-gray-700/50">
                        <span className="text-xs text-gray-400">
                            {new Date(bookmark.createdAt).toLocaleDateString()}
                        </span>
                        <button
                            onClick={() => handleDelete(bookmark.id)}
                            className="rounded-full p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20"
                            aria-label="Delete bookmark"
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
