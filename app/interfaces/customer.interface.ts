export interface Customer {
    id: string | number;
    name: string;
    email: string;
    phone?: string;
    company?: string;
    status?: 'active' | 'inactive' | 'pending';
    createdAt?: Date;
    assignedUserId?: string | number;
    [key: string]: unknown;
}
