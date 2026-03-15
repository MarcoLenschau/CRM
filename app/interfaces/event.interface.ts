import { Prio } from "../enums/prio.enum";

export interface Event {
  _id?: string;
  userID: string;
  name: string;
  description: string;
  prio: Prio;
  createdAt: string;
  updatedAt: string;
}

export interface EventResponse {
  success: boolean;
  events: Event[];
}

export interface EventFormData {
  name: string;
  description: string;
  time: string;
  prio: Prio;
}