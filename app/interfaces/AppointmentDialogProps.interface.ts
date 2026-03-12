import { Appointment } from "../type/appointment";

export interface AppointmentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (appointment: Appointment) => void;
  selectedDate?: number;
}
