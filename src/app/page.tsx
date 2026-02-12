import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 text-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-400/30 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-400/30 blur-[100px]" />
      </div>

      <div className="max-w-3xl space-y-8 relative z-10 p-8 rounded-3xl bg-white/30 dark:bg-black/20 backdrop-blur-md border border-white/20 shadow-2xl">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent pb-2">
            Smart Bookmarks
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            The minimal, private, and real-time bookmark manager for your digital life.
            Sync across devices instantly.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/login"
            className="group flex items-center gap-2 px-8 py-4 rounded-full bg-gray-900 text-white font-semibold transition-all hover:scale-105 hover:shadow-lg dark:bg-white dark:text-black"
          >
            Get Started
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="https://github.com/GouravKumar19"
            target="_blank"
            className="px-8 py-4 rounded-full bg-white/50 text-gray-900 font-semibold border border-gray-200 transition-all hover:bg-white/80 hover:shadow-lg dark:bg-black/50 dark:text-white dark:border-gray-700"
          >
            View on GitHub
          </Link>
        </div>
      </div>
    </main>
  );
}
