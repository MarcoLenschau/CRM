import { LogStatus } from '@/app/enums/status.enum';

/**
 * Audit log record representing a single tracked action in the system.
 * Records user actions (CREATE, READ, UPDATE, DELETE) with context and status for compliance and monitoring.
 *
 * @property _id - Unique MongoDB object ID for the log record
 * @property userID - ID of the user who performed the action
 * @property action - Type of action performed (CREATE, READ, UPDATE, DELETE)
 * @property entity - Type of entity affected (Customer, Event, User, etc.)
 * @property status - Result status of the action (SUCCESS, FAILED, ERROR, etc.)
 * @property description - Human-readable description of the action
 * @property createdAt - Timestamp when the action was performed
 * @property updatedAt - Timestamp of last update to the log record
 * @category Interfaces
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
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
