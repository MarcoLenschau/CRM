import { BaseDialogProps } from './basedialog.interface';

export interface SelectContactDialogProps extends BaseDialogProps {
  onSelectUser: (userId: string) => void;
}
