import { Event } from './event.interface';
import { BaseDialogProps } from './basedialog.interface';

/**
 * Props for the AllEventsDialog component displaying all events for a selected date.
 * Extends BaseDialogProps with date context, event list, and interaction callbacks.
 *
 * @property selectedDay - Day of month (1-31) for which to display events
 * @property month - Month number for event filtering
 * @property year - Year for event filtering
 * @property events - Array of Event objects to display in the dialog
 * @property onEventClick - Optional callback triggered when user clicks on an event in the list
 * @property onAddEventClick - Optional callback triggered when user clicks to add new event
 * @category Interfaces
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export interface AllEventsDialogProps extends BaseDialogProps {
  selectedDay: number;
  month: number;
  year: number;
  events: Event[];
  onEventClick?: (evt: Event) => void;
  onAddEventClick?: () => void;
}
