import { BaseDialogProps } from './basedialog.interface';

export interface EventCreatedDialogProps extends BaseDialogProps {
  eventName?: string;
  eventDate?: string;
}
