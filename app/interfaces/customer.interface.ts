export interface Customer {
    id: number;
    name: string;
    email: string;
    phone?: string;
    company?: string;
    status?: 'active' | 'inactive' | 'pending';
    createdAt?: Date;
    assignedUserId?: number;
    [key: string]: unknown;
}
