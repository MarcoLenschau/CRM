import { User } from "./interfaces/user.interface";

export const db: User[] = [
    { id: 1, name: "John Doe", email: "john.doe@example.com" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
    { id: 3, name: "Alice Johnson", email: "alice.johnson@example.com" },
    { id: 4, name: "Bob Brown", email: "bob.brown@example.com" }
];

export const event = [
    { id: 1, name: "Event 1", description: "Description for Event 1", time: new Date("2026-03-01T10:00:00")},
    { id: 2, name: "Event 2", description: "Description for Event 2", time: new Date("2026-03-01T10:00:00")},
    { id: 3, name: "Event 3", description: "Description for Event 3", time: new Date("2026-03-01T10:00:00")},
    { id: 4, name: "Event 4", description: "Description for Event 4", time: new Date("2026-03-01T10:00:00")}
];