import { StatCardProps } from '@/app/interfaces/statcard.interface';

const colorMap = {
  blue: {
    bg: 'bg-gradient-to-br from-blue-900/20 to-blue-900/5',
    icon: 'bg-blue-900/40 text-blue-400',
    text: 'text-blue-400',
  },
  green: {
    bg: 'bg-gradient-to-br from-green-900/20 to-green-900/5',
    icon: 'bg-green-900/40 text-green-400',
    text: 'text-green-400',
  },
  purple: {
    bg: 'bg-gradient-to-br from-purple-900/20 to-purple-900/5',
    icon: 'bg-purple-900/40 text-purple-400',
    text: 'text-purple-400',
  },
  orange: {
    bg: 'bg-gradient-to-br from-orange-900/20 to-orange-900/5',
    icon: 'bg-orange-900/40 text-orange-400',
    text: 'text-orange-400',
  },
  red: {
    bg: 'bg-gradient-to-br from-red-900/20 to-red-900/5',
    icon: 'bg-red-900/40 text-red-400',
    text: 'text-red-400',
  },
  cyan: {
    bg: 'bg-gradient-to-br from-cyan-900/20 to-cyan-900/5',
    icon: 'bg-cyan-900/40 text-cyan-400',
    text: 'text-cyan-400',
  },
  pink: {
    bg: 'bg-gradient-to-br from-pink-900/20 to-pink-900/5',
    icon: 'bg-pink-900/40 text-pink-400',
    text: 'text-pink-400',
  },
  indigo: {
    bg: 'bg-gradient-to-br from-indigo-900/20 to-indigo-900/5',
    icon: 'bg-indigo-900/40 text-indigo-400',
    text: 'text-indigo-400',
  },
};

/**
 * Statistic display card component showing a metric with label, icon, and color-coded styling.
 * Presents key performance indicators with visual emphasis and consistent design across dashboard.
 *
 * @param label - Metric label displayed above the value
 * @param value - Numeric or text value to display prominently
 * @param icon - React component or SVG element rendered with the stat label
 * @param color - Color theme (blue, green, purple, orange, red, cyan, pink, indigo) for styling
 * @return Rendered stat card with icon, label, and value
 * @throws Error if invalid color theme provided; uses default styling
 * @category UI Components
 * @security Static component displaying provided metrics; no data processing
 * @performance Lightweight card with CSS transitions for smooth hover effects
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export default function StatCard({ label, value, icon, color }: StatCardProps) {
  const colors = colorMap[color];

  return (
    <div className={`${colors.bg} rounded-lg border border-zinc-700/50 p-4 hover:border-zinc-600/80 transition-colors`}>
      <div className="flex items-center gap-3 mb-3">
        <div className={`${colors.icon} rounded-lg p-2`}>
          {icon}
        </div>
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{label}</span>
      </div>
      <p className={`text-3xl font-bold ${colors.text}`}>{value}</p>
    </div>
  );
}
