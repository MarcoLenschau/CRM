import { BaseDialogProps } from './basedialog.interface';

export interface UserDialogProps extends BaseDialogProps {
  editingId: number | null;
  newUser: { name: string; email: string; isAdmin?: boolean };
  onUserChange: (user: { name: string; email: string; isAdmin?: boolean }) => void;
  onSave: () => void;
}
