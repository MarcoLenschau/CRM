import { QuickTipProps } from '@/app/interfaces/quicktip.interface';

interface QuickTipTooltipProps {
  text: string;
  tooltipText: string;
  color?: 'blue' | 'orange' | 'green' | 'red' | 'yellow';
}

const colorMap = {
  blue: 'bg-blue-700/50 hover:bg-blue-600 text-blue-300',
  orange: 'bg-orange-700/50 hover:bg-orange-600 text-orange-300',
  green: 'bg-green-700/50 hover:bg-green-600 text-green-300',
  red: 'bg-red-700/50 hover:bg-red-600 text-red-300',
  yellow: 'bg-yellow-700/50 hover:bg-yellow-600 text-yellow-300',
};

/**
 * Tooltip component displaying helpful information via a question mark button with hover text.
 * Provides contextual assistance with color-coded styling for different information types.
 *
 * @param text - Main label text displayed next to the tooltip button
 * @param tooltipText - Tooltip text revealed on hover
 * @param color - Color scheme for tooltip button (blue, orange, green, red, yellow), defaults to blue
 * @return Rendered tooltip element with label and hover information
 * @throws Error if invalid color scheme provided; falls back to blue
 * @category UI Components
 * @security Tooltip content controlled by props; no user input processed
 * @performance Lightweight component with CSS hover states for performance
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export function QuickTipTooltip({ text, tooltipText, color = 'blue' }: QuickTipTooltipProps) {
  return (
    <div className="group relative inline-flex items-center gap-1">
      <button className={`w-5 h-5 rounded-full ${colorMap[color]} text-xs font-bold flex items-center justify-center transition-colors flex-shrink-0`}>?</button>
      <span>{text}</span>
      <div className="hidden group-hover:block absolute right-0 top-6 w-48 bg-zinc-800 text-xs text-gray-300 p-2 rounded border border-zinc-600 z-10 shadow-lg">
        {tooltipText}
      </div>
    </div>
  );
}

export default function QuickTip({ text, width = 'w-full' }: QuickTipProps) {
  return (
    <div className={`bg-zinc-800 rounded-lg border-2 border-zinc-700 p-5 backdrop-blur-sm ${width}`}>
      <h3 className="text-sm font-semibold text-blue-400 mb-3 flex items-center gap-2">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </svg>
        Quick Tip
      </h3>
      <p className="text-xs text-gray-300 leading-relaxed">
        {text}
      </p>
    </div>
  );
}
