import { BaseDialogProps } from './basedialog.interface';

/**
 * Props for the DeleteConfirmDialog component requesting user confirmation before deletion.
 * Extends BaseDialogProps with entity identifier and confirmation callback.
 *
 * @property userName - Name or identifier of entity to be deleted (displayed in confirmation message)
 * @property onConfirm - Callback function executed when user confirms the deletion
 * @category Interfaces
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export interface DeleteConfirmDialogProps extends BaseDialogProps {
  userName: string;
  onConfirm: () => void;
}
