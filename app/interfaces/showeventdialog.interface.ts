import { Event } from './event.interface';
import { BaseDialogProps } from './basedialog.interface';

export interface ShowEventDialogProps extends BaseDialogProps {
  selectedEvent: Event;
}
