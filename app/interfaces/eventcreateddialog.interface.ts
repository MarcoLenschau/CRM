import { BaseDialogProps } from './basedialog.interface';

/**
 * Props for the EventCreatedDialog component confirming successful event creation.
 * Extends BaseDialogProps with created event details for user confirmation.
 *
 * @property eventName - Optional name of the newly created event
 * @property eventDate - Optional date/time string of the created event
 * @category Interfaces
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export interface EventCreatedDialogProps extends BaseDialogProps {
  eventName?: string;
  eventDate?: string;
}
