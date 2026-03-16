import { BaseDialogProps } from './basedialog.interface';

/**
 * Props for the SuccessDialog component displaying success confirmation message to user.
 * Extends BaseDialogProps with customizable title, message, and optional details.
 *
 * @property title - Success message title (e.g., "Operation Successful!")
 * @property message - Detailed success message text displayed to user
 * @property detailLabel - Optional label for additional detail information
 * @property detailValue - Optional value corresponding to detail label
 * @property buttonText - Optional custom text for confirmation button, defaults to "OK"
 * @category Interfaces
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export interface SuccessDialogProps extends BaseDialogProps {
  title: string;
  message: string;
  detailLabel?: string;
  detailValue?: string;
  buttonText?: string;
}
