export interface Event {
  id: number;
  name: string;
  description: string;
  time: Date;
}

export interface EventFormData {
  name: string;
  description: string;
  time: string;
}