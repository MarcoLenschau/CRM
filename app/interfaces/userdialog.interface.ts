import { BaseDialogProps } from './basedialog.interface';

/**
 * Props for the UserDialog component for creating and editing user accounts.
 * Extends BaseDialogProps with user form data and callback functions for modifications and save.
 *
 * @property editingId - ID of user being edited, null for new user creation
 * @property newUser - User object containing name, email, password, and admin status
 * @property onUserChange - Callback to update parent state when user form fields change
 * @property onSave - Callback function executed when user clicks save to create/update user
 * @category Interfaces
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export interface UserDialogProps extends BaseDialogProps {
  editingId: string | null;
  newUser: { name: string; email: string; password?: string; isAdmin?: boolean };
  onUserChange: (user: { name: string; email: string; password?: string; isAdmin?: boolean }) => void;
  onSave: () => void;
}
