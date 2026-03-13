import { Prio } from "../type/prio.type";

export interface Event {
  id: number;
  name: string;
  description: string;
  time: Date;
  prio: Prio;
}

export interface EventFormData {
  name: string;
  description: string;
  time: string;
  prio: Prio;
}