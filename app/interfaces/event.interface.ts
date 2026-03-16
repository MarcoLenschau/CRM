import { Prio } from "../enums/prio.enum";

/**
 * Calendar event representing a scheduled activity or interaction in the CRM.
 * Tracks event details including name, priority, and timeline information.
 *
 * @property _id - Unique MongoDB object ID for the event
 * @property userID - ID of the user who created or is assigned to the event
 * @property name - Event title or name
 * @property description - Detailed event description or notes
 * @property prio - Priority level of the event (low, medium, high)
 * @property createdAt - Timestamp when the event was created
 * @property updatedAt - Timestamp of last modification to the event
 * @category Interfaces
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export interface Event {
  _id?: string;
  userID: string;
  name: string;
  description: string;
  prio: Prio;
  createdAt: string;
  updatedAt: string;
}

/**
 * API response wrapper for event queries.
 * Standardized response format for event list endpoints.
 *
 * @property success - Boolean indicating if the request was successful
 * @property events - Array of Event objects returned from the query
 * @category Interfaces
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export interface EventResponse {
  success: boolean;
  events: Event[];
}

/**
 * Form data structure for creating or editing events in the UI.
 * Captures user input from event creation/edit dialogs.
 *
 * @property name - Event title entered by user
 * @property description - Event description/notes
 * @property time - Time component of the event (e.g., "14:30")
 * @property prio - Priority level selected by user
 * @property eventDate - Optional specific date for the event
 * @category Interfaces
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export interface EventFormData {
  name: string;
  description: string;
  time: string;
  prio: Prio;
  eventDate?: Date;
}