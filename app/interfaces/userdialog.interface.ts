import { BaseDialogProps } from './basedialog.interface';

export interface UserDialogProps extends BaseDialogProps {
  editingId: string | null;
  newUser: { name: string; email: string; password?: string; isAdmin?: boolean };
  onUserChange: (user: { name: string; email: string; password?: string; isAdmin?: boolean }) => void;
  onSave: () => void;
}
