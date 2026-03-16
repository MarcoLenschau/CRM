import { CustomerStatus } from '@/app/enums/status.enum';

/**
 * Customer entity representing a business contact in the CRM system.
 * Contains customer profile information, contact details, company affiliation, and current status.
 *
 * @property id - Unique identifier for the customer
 * @property name - Full name of the customer
 * @property email - Email address for contact communication
 * @property phone - Optional phone number for direct contact
 * @property company - Optional company name or organization
 * @property status - Current customer status (Active, Inactive, Lead, etc.)
 * @property createdAt - Timestamp when customer record was created
 * @property assignedUserId - ID of the assigned CRM user/sales representative
 * @category Interfaces
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
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
