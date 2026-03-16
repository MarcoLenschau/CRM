/**
 * User entity representing a CRM system user account with authentication and role information.
 * Stores user credentials, contact information, and administrative status.
 *
 * @property _id - Unique MongoDB object ID for the user
 * @property name - Full name of the user
 * @property email - Email address used for authentication and communication
 * @property password - Optional hashed password (not transmitted in responses)
 * @property isAdmin - Boolean flag indicating if user has administrative privileges
 * @category Interfaces
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export interface User {
    _id?: string;
    name: string;
    email: string;
    password?: string;
    isAdmin?: boolean;
    [key: string]: unknown;
}
