export interface AuditLog {
  id: number;
  timestamp: Date;
  user: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'VIEW' | 'LOGIN' | 'LOGOUT' | 'EXPORT' | 'IMPORT';
  entity: 'Customer' | 'User' | 'Email' | 'Event' | 'Settings' | 'Account';
  entityName: string;
  description: string;
  status: 'SUCCESS' | 'FAILED' | 'WARNING';
  ipAddress: string;
  [key: string]: unknown;
}
