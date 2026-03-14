import { BaseDialogProps } from './basedialog.interface';

export interface EmailSentDialogProps extends BaseDialogProps {
  recipientEmail?: string;
}
