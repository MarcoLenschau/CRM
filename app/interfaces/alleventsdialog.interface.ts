import { Event } from './event.interface';
import { BaseDialogProps } from './basedialog.interface';

export interface AllEventsDialogProps extends BaseDialogProps {
  selectedDay: number;
  month: number;
  year: number;
  onEventClick?: (evt: Event) => void;
  onAddEventClick?: () => void;
}
