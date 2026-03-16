import { BaseDialogProps } from './basedialog.interface';

/**
 * Props for the SelectContactDialog component allowing selection of a user/contact.
 * Extends BaseDialogProps with callback to handle user selection.
 *
 * @property onSelectUser - Callback function receiving the selected user ID
 * @category Interfaces
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export interface SelectContactDialogProps extends BaseDialogProps {
  onSelectUser: (userId: string) => void;
}
