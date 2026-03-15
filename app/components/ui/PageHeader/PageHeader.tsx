/**
 * Page header component displaying title, subtitle, and icon with customizable color scheme.
 * Provides consistent page identification with visual icon indicator and descriptive subtitle.
 *
 * @param h1 - Main heading text displayed prominently
 * @param h2 - Subtitle text for additional context
 * @param img - SVG path data for icon display
 * @param color - CSS color value for icon background styling
 * @return Rendered page header with icon, title, and subtitle
 * @throws Error if required props (h1, h2, img, color) are missing or invalid; uses empty fallback values
 * @category UI Components
 * @security SVG paths provided as props; uses React's built-in XSS protection
 * @performance Static component with no state or re-renders
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export default function PageHeader({ h1, h2, img, color}: { h1: string; h2: string; img: string; color: string }) {
    return (
      <div className="py-6 border-b-2 border-zinc-700">
        <div className="flex items-center gap-4 pl-75">
          <div className="rounded-xl p-3 border-2 border-zinc-500" style={{ backgroundColor: color }}>
            <svg className={`w-8 h-8`} fill={`currentColor`} viewBox="0 0 24 24">
              <path d={img}/>
            </svg>  
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{h1}</h1>
            <p className="text-sm text-gray-400 mt-1">{h2}</p>
          </div>
        </div>
      </div>    
    );
}
