import { User } from "./interfaces/user.interface";

export const db: User[] = [
    { id: 1, name: "John Doe", email: "john.doe@example.com" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
    { id: 3, name: "Alice Johnson", email: "alice.johnson@example.com" },
    { id: 4, name: "Bob Brown", email: "bob.brown@example.com" }
];

export const activity = [
    { id: 1, type: "call", userId: 1, action: "Call with John Doe", timestamp: new Date("2026-03-13T09:30:00") },
    { id: 2, type: "email", userId: 2, action: "Email sent to Jane Smith", timestamp: new Date("2026-03-13T08:15:00") },
    { id: 3, type: "new_contact", userId: 3, action: "New contact: Alice Johnson added", timestamp: new Date("2026-03-12T14:45:00") },
    { id: 4, type: "call", userId: 4, action: "Call with Bob Brown", timestamp: new Date("2026-03-12T11:00:00") },
    { id: 5, type: "email", userId: 1, action: "Email from John Doe received", timestamp: new Date("2026-03-11T16:20:00") }
];

export const event = [
    { id: 1, name: "Event 1", description: "Description for Event 1", time: new Date("2026-03-01T10:00:00"), prio: "high" as const},
    { id: 2, name: "Event 2", description: "Description for Event 2", time: new Date("2026-03-01T10:00:00"), prio: "medium" as const},
    { id: 3, name: "Event 3", description: "Description for Event 3", time: new Date("2026-03-01T10:00:00"), prio: "low" as const},
    { id: 4, name: "Event 4", description: "Description for Event 4", time: new Date("2026-03-01T10:00:00"), prio: "high" as const},
    { id: 5, name: "Event 5", description: "Description for Event 5", time: new Date("2026-03-01T10:00:00"), prio: "medium" as const}
];

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