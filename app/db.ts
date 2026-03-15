/**
 * In-memory mock database and seed data for development and testing.
 * Provides sample user data and email templates for quick prototyping.
 *
 * @category Database
 * @security Mock data for development only; not for production use
 * @performance In-memory data for fast access without database queries
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
import { User } from "./interfaces/user.interface";

/**
 * Mock user database with sample user records.
 * Contains 4 predefined users for testing authentication and user management features.
 *
 * @type {User[]}
 * @category Database
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export const db: User[] = [
    { id: 1, name: "John Doe", email: "john.doe@example.com" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
    { id: 3, name: "Alice Johnson", email: "alice.johnson@example.com" },
    { id: 4, name: "Bob Brown", email: "bob.brown@example.com" }
];

/**
 * Email template library for quick email composition.
 * Pre-formatted email templates for common communication scenarios.
 * Each template contains title, subject, and body with placeholder text.
 *
 * @type {Array<{title: string, subject: string, body: string}>}
 * @category Database
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export const emailTemplates = [
    {
        title: 'Follow-up',
        subject: 'Follow-up: Our Discussion',
        body: 'Hi there,\n\nI wanted to follow up on our recent conversation. I believe our solution could be a great fit for your needs.\n\nWould you be available for a brief call next week?\n\nBest regards'
    },
    {
        title: 'Quote Request',
        subject: 'Quote Request',
        body: 'Hello,\n\nThank you for your interest. I would be happy to provide you with a detailed quote.\n\nCould you please share more details about your requirements?\n\nBest regards'
    },
    {
        title: 'Introduction',
        subject: 'Let\'s Connect',
        body: 'Hi,\n\nI wanted to reach out and introduce our services. We specialize in helping businesses like yours achieve their goals.\n\nI\'d love to discuss how we can help.\n\nBest regards'
    },
    {
        title: 'Thank You',
        subject: 'Thank You for Your Business',
        body: 'Hello,\n\nThank you so much for choosing us. We truly appreciate your business and look forward to working with you.\n\nPlease don\'t hesitate to reach out if you need anything.\n\nBest regards'
    }
];