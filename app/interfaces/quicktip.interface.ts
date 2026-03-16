/**
 * Props for the QuickTip component displaying informational tooltip text.
 * Provides visual hint or help text with customizable width for layout flexibility.
 *
 * @property text - Tooltip text content to display
 * @property width - Optional Tailwind CSS width class (e.g., 'w-full', 'w-96'), defaults to full width
 * @category Interfaces
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export interface QuickTipProps {
  text: string;
  width?: string;
}
