import { BaseDialogProps } from './basedialog.interface';

/**
 * Props for the EmailSentDialog component confirming successful email delivery.
 * Extends BaseDialogProps with optional recipient email display.
 *
 * @property recipientEmail - Optional email address of the message recipient to display confirmation
 * @category Interfaces
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export interface EmailSentDialogProps extends BaseDialogProps {
  recipientEmail?: string;
}
