import { BaseDialogProps } from './basedialog.interface';

export interface DeleteConfirmDialogProps extends BaseDialogProps {
  userName: string;
  onConfirm: () => void;
}
