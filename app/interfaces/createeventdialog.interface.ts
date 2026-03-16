import { EventFormData } from './event.interface';
import { BaseDialogProps } from './basedialog.interface';

/**
 * Props for the CreateEventDialog component allowing users to create new calendar events.
 * Extends BaseDialogProps with date/time selection and form submission handler.
 *
 * @property onSubmit - Callback function receiving EventFormData when user submits the form
 * @property selectedDay - Day of month (1-31) for the event
 * @property month - Month number (0-11 or 1-12 depending on convention) for the event
 * @property year - Four-digit year for the event
 * @category Interfaces
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export interface CreateEventDialogProps extends BaseDialogProps {
  onSubmit: (eventData: EventFormData) => void;
  selectedDay: number;
  month: number;
  year: number;
}
