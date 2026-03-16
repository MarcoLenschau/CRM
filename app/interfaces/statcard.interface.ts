import { ReactNode } from 'react';

/**
 * Props for the StatCard component displaying statistics with label, value, and visual styling.
 * Used throughout the dashboard to show key metrics and KPIs with color-coded indicators.
 *
 * @property label - Display label describing the statistic
 * @property value - Numeric or string value to display
 * @property icon - React component/element icon to display alongside the stat
 * @property color - Color theme (blue, green, purple, orange, red, cyan, pink, indigo) for visual distinction
 * @category Interfaces
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export interface StatCardProps {
  label: string;
  value: number | string;
  icon: ReactNode;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'cyan' | 'pink' | 'indigo';
}
