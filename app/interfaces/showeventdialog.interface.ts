import { Event } from './event.interface';
import { BaseDialogProps } from './basedialog.interface';

/**
 * Props for the ShowEventDialog component displaying detailed view of a specific event.
 * Extends BaseDialogProps with the event to display.
 *
 * @property selectedEvent - Event object containing details to display in the dialog
 * @category Interfaces
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export interface ShowEventDialogProps extends BaseDialogProps {
  selectedEvent: Event;
}
