import Link from "next/link";
import Image from "next/image";
import linkedin from "../../../public/social-networks/linkedin.png";

/**
 * Application footer with legal links and social media integration.
 * Displays copyright info, legal pages, and LinkedIn connection.
 *
 * @return Rendered footer component with navigation and social links
 * @throws Error if LinkedIn image fails to load or social links are unavailable; displays fallback text
 * @category Layout
 * @security Links to public legal pages, no sensitive data exposed
 * @performance Static footer with minimal dependencies
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-zinc-700">
      <div className="max-w-8xl mx-auto px-6 py-4">
        <div className="flex items-center justify-around pr-24">
          <div>
            <h3 className="text-white font-bold text-sm flex items-center gap-2">
              <div className="bg-blue-900/30 rounded-lg p-1.5 border border-blue-700/50">
                <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                </svg>
              </div>
              CRM System
            </h3>
            <p className="text-gray-500 text-xs leading-relaxed hidden md:block">
              Professional CRM for your business.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs mb-2 uppercase">Quick Links</h4>
            <ul className="space-y-1">
              <li>
                <Link href="/" className="text-gray-500 hover:text-blue-400 text-xs transition-colors flex items-center gap-1">
                  <span>→</span>Login
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-gray-500 hover:text-blue-400 text-xs transition-colors flex items-center gap-1">
                  <span>→</span>Register
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-xs mb-2 uppercase">Resources</h4>
            <ul className="space-y-1">
              <li>
                <a href="#" className="text-gray-500 hover:text-blue-400 text-xs transition-colors flex items-center gap-1">
                  <span>→</span> API
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-blue-400 text-xs transition-colors flex items-center gap-1">
                  <span>→</span> Docs
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs mb-2 uppercase">Legal</h4>
            <ul className="space-y-1">
              <li>
                <Link href="/impress" className="text-gray-500 hover:text-blue-400 text-xs transition-colors flex items-center gap-1">
                  <span>→</span> Impressum
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-500 hover:text-blue-400 text-xs transition-colors flex items-center gap-1">
                  <span>→</span> Privacy
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://github.com/MarcoLenschau" className="text-gray-600" target="_blank">
              <svg className="w-8 h-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/marcolenschau/" target="_blank">
              <Image src={linkedin} alt="linkedIn" height={40} width={40}/>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
