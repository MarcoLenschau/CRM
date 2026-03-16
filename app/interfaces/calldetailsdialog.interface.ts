import { BaseDialogProps } from './basedialog.interface';

/**
 * Props for the CallDetailsDialog component for recording call details and follow-up actions.
 * Extends BaseDialogProps with selected customer ID reference.
 *
 * @property selectedUserId - ID of the customer/user whose call details are being recorded (null if no selection)
 * @category Interfaces
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export interface CallDetailsDialogProps extends BaseDialogProps {
  selectedUserId: string | null;
}
