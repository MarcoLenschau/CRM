import { EventFormData } from './event.interface';
import { BaseDialogProps } from './basedialog.interface';

export interface CreateEventDialogProps extends BaseDialogProps {
  onSubmit: (eventData: EventFormData) => void;
  selectedDay: number;
  month: number;
  year: number;
}
