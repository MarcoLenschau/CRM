import { CustomerStatus } from '@/app/enums/status.enum';

export interface Customer {
    id: string;
    name: string;
    email: string;
    phone?: string;
    company?: string;
    status: CustomerStatus;
    createdAt?: Date;
    assignedUserId?: string;
    [key: string]: unknown;
}
