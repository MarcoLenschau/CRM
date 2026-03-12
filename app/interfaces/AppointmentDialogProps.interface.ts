import { Appointment } from "../type/appointment.type";

export interface AppointmentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (appointment: Appointment) => void;
  selectedDate?: number;
}
