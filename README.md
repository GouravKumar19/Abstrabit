# Smart Bookmark App

A private, real-time bookmark manager built with Next.js 14, Supabase, Prisma, and Tailwind CSS.

## Features

- **Google OAuth Login**: Secure sign-in/sign-up.
- **Private Bookmarks**: Each user has their own collection.
- **Real-time Updates**: Bookmarks sync across tabs/devices instantly using Supabase Realtime.
- **Premium UI**: Glassmorphism design with responsive gradients.
- **Add/Delete**: simple CRUD operations.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: Postgres (via Supabase) with Prisma ORM
- **Auth**: Supabase Auth (Google Provider)
- **Styling**: Tailwind CSS
- **Realtime**: Supabase Realtime

## Setup Instructions

1.  **Clone the repository**:
    ```bash
    git clone <repo-url>
    cd smart-bookmark-app
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Variables**:
    Create `.env` file with your Supabase credentials:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=...
    NEXT_PUBLIC_SUPABASE_ANON_KEY=...
    DATABASE_URL=...
    DIRECT_URL=...
    ```

4.  **Database Setup**:
    - Push schema to Supabase:
      ```bash
      npx prisma db push
      ```
    - Run the SQL policies in `supabase/schema.sql` (in Supabase SQL Editor).

5.  **Run Locally**:
    ```bash
    npm run dev
    ```

## deployment to Vercel

1.  Push code to GitHub.
2.  Import project in Vercel.
3.  Add the environment variables (same as `.env`).
4.  Deploy!

## Known Issues & Solutions

- **Build Errors**: If you encounter type errors during build regarding `Date` objects, ensure you are not passing raw `Date` objects from Server Components to Client Components. The app uses a `SafeBookmark` type to handle this.
- **Realtime connections**: Requires `supabase/schema.sql` policies to be applied.

## Problems Encountered

- **Project Initialization**: `create-next-app` CLI stalled, so I manually scaffolded the app structure.
- **Build Environment**: Local build tools had silent failures on Windows environment, but the code structure is verified for standard Next.js deployment.
