# Smart Bookmark App 🔖

Hey there! 👋 This is a Next.js application I built to help manage bookmarks smartly and efficiently. I wanted to create something that wasn't just a simple list but had a premium feel with real-time updates and secure authentication.

## 🚀 Why I Built This
I often find myself drowning in browser tabs and losing interesting links. I wanted a personal space where I could:
- Quickly save links.
- Have them sync instantly across my devices (laptop + phone) without refreshing.
- Keep everything private and secure.

## 🛠️ Tech Stack
I chose this stack to learn the latest features of the Next.js ecosystem:
- **Framework**: Next.js 14 (App Router) - specifically leveraging Server Actions for mutations.
- **Database**: PostgreSQL (via Supabase) - robust and scalable.
- **ORM**: Prisma - for type-safe database queries.
- **Auth**: Supabase Auth (Google OAuth) - smooth sign-in experience.
- **Styling**: Tailwind CSS - for that glassmorphism look! ✨

## 💡 Challenges & Learnings
Building this wasn't a straight line! Here are some hurdles I hit and how I solved them (hope this helps you if you're stuck on similar things):

### 1. The "Server Action null" Error 🤯
I initially tried using the `useFormState` hook for the "Add Bookmark" form. It kept throwing a weird `Failed to find Server Action "null"` error.
**Solution**: I realized the hook stability was fighting with my setup, so I refactored it to a standard `onSubmit` handler. It’s simpler and rock-solid now.

### 2. Google Redirect Mismatch 🔄
Getting Google OAuth to work locally vs. production was tricky. I kept getting `redirect_uri_mismatch`.
**Solution**: I learned you have to be *exact* with Google Cloud Console. `http://localhost:3000` is NOT the same as `http://localhost:3000/`. Also, Supabase handles the callback magic, so I had to whitelist the Supabase URL, not just my localhost.

### 3. Database Connection Limits ⚠️
Prisma sometimes exhausted the database connections in dev mode (`42P05` prepared statement error).
**Solution**: Added `?pgbouncer=true` to my connection string to use Supabase's transaction pooler. Works like a charm now.

## 🏃‍♂️ How to Run It
If you want to spin this up on your machine:

1.  **Clone the repo**:
    ```bash
    git clone https://github.com/your-username/smart-bookmark-app.git
    cd smart-bookmark-app
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Set up Environment Variables**:
    Create a `.env.local` file with your Supabase & Database keys (see `.env.example`).

4.  **Run it**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) and sign in!

## License
MIT. Feel free to use this code for your own projects!

---
*Built with ❤️ and a lot of coffee.*
