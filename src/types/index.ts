import { Bookmark } from "@prisma/client";

// Define a type for the serialized bookmark (safe for client components)
export type SafeBookmark = Omit<Bookmark, "createdAt"> & {
    createdAt: string;
};
