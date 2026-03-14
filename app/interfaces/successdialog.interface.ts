import { BaseDialogProps } from './basedialog.interface';

export interface SuccessDialogProps extends BaseDialogProps {
  title: string;
  message: string;
  detailLabel?: string;
  detailValue?: string;
  buttonText?: string;
}
