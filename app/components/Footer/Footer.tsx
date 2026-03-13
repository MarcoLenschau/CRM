import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t-2 border-zinc-700">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Company Info */}
          <div className="flex items-center gap-2">
            <div className="bg-blue-900/30 rounded-lg p-1.5 border border-blue-700/50">
              <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
              </svg>
            </div>
            <span className="text-white font-bold text-xs">CRM System</span>
          </div>

          {/* Links - Inline */}
          <div className="flex items-center gap-6 text-xs">
            <Link href="/dashboard" className="text-gray-500 hover:text-blue-400 transition-colors">
              Dashboard
            </Link>
            <Link href="/calendar" className="text-gray-500 hover:text-blue-400 transition-colors">
              Calendar
            </Link>
            <Link href="/impress" className="text-gray-500 hover:text-blue-400 transition-colors">
              Impressum
            </Link>
            <Link href="/privacy" className="text-gray-500 hover:text-blue-400 transition-colors">
              Privacy
            </Link>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-600 hover:text-blue-400 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-400 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 002.856-3.555 10.003 10.003 0 01-2.856 1.113 5.009 5.009 0 002.19-2.766 10.002 10.002 0 01-3.144 1.2 5 5 0 00-8.54 4.56A14.231 14.231 0 011.392 3.77 5 5 0 003.35 9.08a5 5 0 01-2.263-.567v.063a5 5 0 004.003 4.899 5 5 0 01-2.26.086 5.003 5.003 0 004.667 3.478 10.004 10.004 0 01-6.174 2.128 14.234 14.234 0 002.132 1.425 14.134 14.134 0 0010.196 2.132c12.236 0 18.879-10.138 18.879-18.878 0-.287-.006-.575-.02-.86a13.5 13.5 0 003.32-3.46z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-400 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>

          {/* Copyright */}
          <div className="text-gray-600 text-xs">
            © {currentYear} CRM
          </div>
        </div>
      </div>
    </footer>
  );
}
