"use client";

import { addBookmark } from "@/app/actions";
import { useFormStatus } from "react-dom";
import { useRef } from "react";

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="ml-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-offset-gray-800"
        >
            {pending ? "Adding..." : "Add"}
        </button>
    );
}

export default function AddBookmarkForm() {
    const formRef = useRef<HTMLFormElement>(null);

    return (
        <form
            action={async (formData) => {
                await addBookmark(null, formData);
                formRef.current?.reset();
            }}
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
            <SubmitButton />
        </form>
    );
}
