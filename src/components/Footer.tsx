import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-bg-secondary border-t border-surface-primary py-12 px-6 md:px-12 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-accent-indigo to-accent-violet flex items-center justify-center font-display font-semibold text-white text-xs">
              D
            </div>
            <span className="font-display font-semibold tracking-wide text-white">
              AI-Dicto
            </span>
          </div>
          <p className="text-xs text-text-muted max-w-sm leading-relaxed">
            Get the Right One. Describe your goal, and discover the most suitable AI tools through conversation instead of endless directories.
          </p>
        </div>

        <div className="flex flex-wrap gap-x-12 gap-y-6">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-white tracking-wider uppercase">Product</span>
            <Link href="/#categories" className="text-xs text-text-secondary hover:text-white transition-colors duration-150">
              Categories
            </Link>
            <Link href="/#trending" className="text-xs text-text-secondary hover:text-white transition-colors duration-150">
              Trending Tools
            </Link>
            <Link href="/dashboard" className="text-xs text-text-secondary hover:text-white transition-colors duration-150">
              Dashboard
            </Link>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-white tracking-wider uppercase">Legal</span>
            <Link href="#" className="text-xs text-text-secondary hover:text-white transition-colors duration-150">
              Privacy Policy
            </Link>
            <Link href="#" className="text-xs text-text-secondary hover:text-white transition-colors duration-150">
              Terms of Service
            </Link>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-white tracking-wider uppercase">Credits</span>
            <span className="text-xs text-text-muted">
              Built by YUVA
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-surface-primary/50 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="text-[10px] text-text-muted">
          &copy; {new Date().getFullYear()} AI-Dicto. All rights reserved.
        </span>
        <span className="text-[10px] text-text-muted">
          Nexora Frontend Development Challenge
        </span>
      </div>
    </footer>
  );
}
