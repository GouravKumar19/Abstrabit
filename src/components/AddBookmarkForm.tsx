"use client";

import { addBookmark } from "@/app/actions";
import { createClient } from "@/lib/supabase/client";
import { useRef, useMemo, useState } from "react";

export default function AddBookmarkForm() {
    const formRef = useRef<HTMLFormElement>(null);
    const [loading, setLoading] = useState(false);
    const supabase = useMemo(() => createClient(), []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.currentTarget);

        try {
            // Pass a dummy state object as first argument to match the Server Action signature
            const result = await addBookmark(null, formData);

            if (result?.message === "Success") {
                formRef.current?.reset();

                // Broadcast change to other tabs for real-time sync
                await supabase.channel("bookmark-sync").send({
                    type: "broadcast",
                    event: "bookmark-change",
                    payload: { action: "insert" },
                });
            } else if (result?.message) {
                alert(result.message);
            }
        } catch (error) {
            console.error("Error adding bookmark:", error);
            alert("Failed to add bookmark");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            ref={formRef}
            className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end"
        >
            <div>
                <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                    Title
                </label>
                <div className="mt-1">
                    <input
                        type="text"
                        name="title"
                        id="title"
                        required
                        className="block w-full rounded-md border-gray-300 bg-white p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
                        placeholder="Google"
                    />
                </div>
            </div>
            <div className="flex-1">
                <label
                    htmlFor="url"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                    URL
                </label>
                <div className="mt-1">
                    <input
                        type="url"
                        name="url"
                        id="url"
                        required
                        className="block w-full rounded-md border-gray-300 bg-white p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
                        placeholder="https://google.com"
                    />
                </div>
            </div>
            <button
                type="submit"
                disabled={loading}
                className="ml-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-offset-gray-800"
            >
                {loading ? "Adding..." : "Add"}
            </button>
        </form>
    );
}
