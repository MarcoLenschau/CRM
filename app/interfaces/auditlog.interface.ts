import { LogStatus } from '@/app/enums/status.enum';

export interface AuditLog {
  _id?: string;
  userID: string;
  action: string;
  entity: string;
  status: LogStatus;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}
