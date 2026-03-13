import { User } from "./interfaces/user.interface";
import { Customer } from "./interfaces/customer.interface";
import { AuditLog } from "./interfaces/auditlog.interface";

export const db: User[] = [
    { id: 1, name: "John Doe", email: "john.doe@example.com" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
    { id: 3, name: "Alice Johnson", email: "alice.johnson@example.com" },
    { id: 4, name: "Bob Brown", email: "bob.brown@example.com" }
];

export const customers: Customer[] = [
    { id: 1, name: "TechStart GmbH", email: "contact@techstart.de", phone: "+49 30 123456", company: "TechStart GmbH", status: "active", createdAt: new Date("2026-01-15"), assignedUserId: 1 },
    { id: 2, name: "Green Solutions AG", email: "info@greensolutions.de", phone: "+49 40 654321", company: "Green Solutions AG", status: "active", createdAt: new Date("2026-02-10"), assignedUserId: 1 },
    { id: 3, name: "Digital Ventures", email: "sales@digitalventures.de", phone: "+49 69 987654", company: "Digital Ventures", status: "active", createdAt: new Date("2026-01-20"), assignedUserId: 2 },
    { id: 4, name: "InnovateHub Munich", email: "hello@innovatehub.de", phone: "+49 89 555888", company: "InnovateHub Munich", status: "pending", createdAt: new Date("2026-03-05"), assignedUserId: 2 },
    { id: 5, name: "CloudFirst Systems", email: "contact@cloudfirst.de", phone: "+49 221 111222", company: "CloudFirst Systems", status: "active", createdAt: new Date("2026-02-28"), assignedUserId: 3 },
    { id: 6, name: "DataDrive Analytics", email: "team@datadrive.de", phone: "+49 341 333444", company: "DataDrive Analytics", status: "inactive", createdAt: new Date("2025-11-12"), assignedUserId: 3 },
    { id: 7, name: "SecureNet Solutions", email: "support@securenet.de", phone: "+49 511 777888", company: "SecureNet Solutions", status: "active", createdAt: new Date("2026-02-01"), assignedUserId: 4 },
    { id: 8, name: "Future Logistics Inc", email: "logistics@future.de", phone: "+49 201 999111", company: "Future Logistics Inc", status: "active", createdAt: new Date("2026-03-01"), assignedUserId: 4 }
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

export const auditLogs: AuditLog[] = [
    { id: 1, timestamp: new Date("2026-03-13T14:30:00"), user: "John Doe", action: "CREATE", entity: "Customer", entityName: "TechStart GmbH", description: "Created new customer: TechStart GmbH", status: "SUCCESS", ipAddress: "192.168.1.100" },
    { id: 2, timestamp: new Date("2026-03-13T14:15:00"), user: "Jane Smith", action: "UPDATE", entity: "Customer", entityName: "Green Solutions AG", description: "Updated customer status to active", status: "SUCCESS", ipAddress: "192.168.1.101" },
    { id: 3, timestamp: new Date("2026-03-13T13:45:00"), user: "Alice Johnson", action: "DELETE", entity: "User", entityName: "Bob Brown", description: "Deleted user account", status: "SUCCESS", ipAddress: "192.168.1.102" },
    { id: 4, timestamp: new Date("2026-03-13T13:20:00"), user: "Bob Brown", action: "LOGIN", entity: "Account", entityName: "Bob Brown", description: "User logged in", status: "SUCCESS", ipAddress: "192.168.1.103" },
    { id: 5, timestamp: new Date("2026-03-13T12:50:00"), user: "John Doe", action: "EXPORT", entity: "Customer", entityName: "All Customers", description: "Exported 8 customers to CSV", status: "SUCCESS", ipAddress: "192.168.1.100" },
    { id: 6, timestamp: new Date("2026-03-13T12:30:00"), user: "Jane Smith", action: "CREATE", entity: "Email", entityName: "Follow-up Email", description: "Created new email template", status: "SUCCESS", ipAddress: "192.168.1.101" },
    { id: 7, timestamp: new Date("2026-03-13T12:00:00"), user: "Alice Johnson", action: "LOGIN", entity: "Account", entityName: "Alice Johnson", description: "User logged in", status: "SUCCESS", ipAddress: "192.168.1.102" },
    { id: 8, timestamp: new Date("2026-03-13T11:45:00"), user: "Bob Brown", action: "UPDATE", entity: "Settings", entityName: "User Settings", description: "Updated notification preferences", status: "SUCCESS", ipAddress: "192.168.1.103" },
    { id: 9, timestamp: new Date("2026-03-13T11:15:00"), user: "John Doe", action: "VIEW", entity: "Customer", entityName: "Digital Ventures", description: "Viewed customer details", status: "SUCCESS", ipAddress: "192.168.1.100" },
    { id: 10, timestamp: new Date("2026-03-13T10:30:00"), user: "Jane Smith", action: "DELETE", entity: "Email", entityName: "Old Template", description: "Deleted old email template", status: "SUCCESS", ipAddress: "192.168.1.101" },
    { id: 11, timestamp: new Date("2026-03-13T10:00:00"), user: "Alice Johnson", action: "IMPORT", entity: "Customer", entityName: "Bulk Import", description: "Imported 5 customers from file", status: "SUCCESS", ipAddress: "192.168.1.102" },
    { id: 12, timestamp: new Date("2026-03-13T09:45:00"), user: "Bob Brown", action: "CREATE", entity: "Event", entityName: "Team Meeting", description: "Created new calendar event", status: "SUCCESS", ipAddress: "192.168.1.103" },
    { id: 13, timestamp: new Date("2026-03-12T16:20:00"), user: "John Doe", action: "UPDATE", entity: "User", entityName: "Jane Smith", description: "Updated user role to Admin", status: "SUCCESS", ipAddress: "192.168.1.100" },
    { id: 14, timestamp: new Date("2026-03-12T15:30:00"), user: "Jane Smith", action: "LOGIN", entity: "Account", entityName: "Jane Smith", description: "User logged in", status: "SUCCESS", ipAddress: "192.168.1.101" },
    { id: 15, timestamp: new Date("2026-03-12T14:15:00"), user: "Alice Johnson", action: "LOGOUT", entity: "Account", entityName: "Alice Johnson", description: "User logged out", status: "SUCCESS", ipAddress: "192.168.1.102" },
];